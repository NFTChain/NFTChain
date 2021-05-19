// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.7.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "hardhat/console.sol";

contract NftChainBEP721 is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter public totalInks;
    using SafeMath for uint256;

    IERC20 currencyToken; // our main currency which will be an ERC20 token called NFTC

    uint256 public feeTake; // the fee percentage which covers the the costs of using Pinatas service
    address payable feeAddress; // the address where we sent the fees to

    constructor(IERC20 _currencyTokenAddress)
        public
        ERC721("NFTChainArt", "NFTCA")
    {
        _setBaseURI("https://ipfs.io/ipfs/");
        currencyToken = _currencyTokenAddress;
        setFeeTake(1);
        setFeeAddress(msg.sender);
    }

    // events which are important for querying data with the graph
    event newInk(
        uint256 id,
        address indexed artist,
        string inkUrl,
        uint256 limit,
        uint256 price
    );
    event boughtInk(uint256 id, string inkUrl, address buyer, uint256 price);
    event boughtToken(uint256 id, string inkUrl, address buyer, uint256 price);
    event newInkPrice(uint256 id, uint256 price);
    event newTokenPrice(uint256 id, uint256 price);

    struct Ink {
        uint256 id;
        address payable artist; // address of user who created unminted NFT
        string inkUrl;
        uint256 limit; // indicates how often something CAN GET minted
        uint256 count; // indicates how often IT GOT minted
        bool exists;
        uint256 price; // if price is set, it's up for sale
    }

    mapping(string => uint256) private _inkIdByUrl;
    mapping(uint256 => Ink) private _inkById;
    mapping(string => EnumerableSet.UintSet) private _inkTokens;
    mapping(address => EnumerableSet.UintSet) private _artistInks;
    mapping(uint256 => uint256) private _inkIdByTokenId;

    mapping(uint256 => uint256) public tokenPriceByTokenId;

    function _createInk(
        string memory inkUrl,
        uint256 limit,
        address payable artist,
        uint256 price
    ) internal returns (uint256) {
        totalInks.increment();

        Ink memory _ink = Ink({
            id: totalInks.current(),
            artist: artist,
            inkUrl: inkUrl,
            limit: limit,
            count: 0,
            exists: true,
            price: price
        });

        _inkIdByUrl[inkUrl] = _ink.id;
        _inkById[_ink.id] = _ink;
        _artistInks[artist].add(_ink.id);

        emit newInk(_ink.id, _ink.artist, _ink.inkUrl, _ink.limit, _ink.price);

        return _ink.id;
    }

    function createInk(
        string memory inkUrl,
        uint256 limit,
        uint256 price
    ) public returns (uint256) {
        require(!(_inkIdByUrl[inkUrl] > 0), "this ink already exists!");

        uint256 inkId = _createInk(inkUrl, limit, msg.sender, price);

        // _mintInkToken(msg.sender, inkId, inkUrl); // comment out to let buyer of NFT mint the token

        return inkId;
    }

    function _mintInkToken(
        address to,
        uint256 inkId,
        string memory inkUrl
    ) internal returns (uint256) {
        _inkById[inkId].count += 1;

        _tokenIds.increment();
        uint256 id = _tokenIds.current();
        _inkTokens[inkUrl].add(id);
        _inkIdByTokenId[id] = inkId;

        _mint(to, id);
        _setTokenURI(id, inkUrl);

        return id;
    }

    // mint function gives artist allowance to mint NFT itself
    function mint(address to, string memory inkUrl) public returns (uint256) {
        uint256 _inkId = _inkIdByUrl[inkUrl];
        require(_inkId > 0, "this ink does not exist!");
        Ink storage _ink = _inkById[_inkId];
        require(_ink.artist == msg.sender, "only the artist can mint!");
        require(
            _ink.count < _ink.limit || _ink.limit == 0,
            "this ink is over the limit!"
        );

        uint256 tokenId = _mintInkToken(to, _inkId, _ink.inkUrl);

        return tokenId;
    }

    // sets the price of a unminted NFT
    function setPrice(string memory inkUrl, uint256 price)
        public
        returns (uint256)
    {
        uint256 _inkId = _inkIdByUrl[inkUrl];
        require(_inkId > 0, "this ink does not exist!");
        Ink storage _ink = _inkById[_inkId];
        require(
            _ink.artist == msg.sender,
            "only the artist can set the price!"
        );
        require(
            _ink.count < _ink.limit || _ink.limit == 0,
            "this ink is over the limit!"
        );

        _inkById[_inkId].price = price;

        emit newInkPrice(inkUrl, price);

        return price;
    }

    // buyer buys unminted NFT
    function buyInk(string memory inkUrl) public payable returns (uint256) {
        uint256 _inkId = _inkIdByUrl[inkUrl];

        require(_inkId > 0, "this ink does not exist!");

        Ink storage _ink = _inkById[_inkId];
        require(
            _ink.count < _ink.limit || _ink.limit == 0,
            "this ink is over the limit!"
        );

        address _buyer = msg.sender;
        address _seller = _ink.artist;
        uint256 _price = _ink.price;

        require(_price > 0, "this ink does not have a price set");

        uint256 allowance = currencyToken.allowance(_buyer, address(this));
        require(allowance >= _price, "Check the token allowance"); // check if transaction is allowed, if not revert

        uint256 tokenId = _mintInkToken(_buyer, _inkId, inkUrl);
        //Note: a pull mechanism would be safer here: https://docs.openzeppelin.com/contracts/2.x/api/payment#PullPayment

        uint256 _feeTake = feeTake.mul(msg.value).div(100);
        uint256 _sellerTake = msg.value.sub(_feeTake);
        currencyToken.transferFrom(_buyer, devAddress, _feeTake); // send BEP20 tokens as fee to dev address
        currencyToken.transferFrom(_buyer, _seller, _sellerTake); // send BEP20 tokens to seller of the NFT

        emit boughtInk(tokenId, inkUrl, _buyer, _price);
        return tokenId;
    }

    // sets the price of minted NFT
    function setTokenPrice(uint256 _tokenId, uint256 _price)
        public
        returns (uint256)
    {
        require(_exists(_tokenId), "this token does not exist!");
        require(
            ownerOf(_tokenId) == msg.sender,
            "only the owner can set the price!"
        );

        tokenPriceByTokenId[_tokenId] = _price;
        emit newTokenPrice(_tokenId, _price);
        return _price;
    }

    // buy function for already minted NFT
    function buyToken(uint256 _tokenId) public payable {
        uint256 _price = tokenPriceByTokenId[_tokenId];

        require(_price > 0, "this token is not for sale");

        address _buyer = msg.sender;
        address _seller = address(uint160(ownerOf(_tokenId)));

        uint256 allowance = currencyToken.allowance(_buyer, address(this));
        require(allowance >= _price, "Check the token allowance"); // check if transaction is allowed, if not revert

        _transfer(_seller, _buyer, _tokenId); // send BEP721 / NFT token to buyer
        //Note: a pull mechanism would be safer here: https://docs.openzeppelin.com/contracts/2.x/api/payment#PullPayment

        uint256 _feeTake = feeTake.mul(msg.value).div(100);
        uint256 _sellerTake = msg.value.sub(_feeTake);
        currencyToken.transferFrom(_buyer, devAddress, _feeTake); // send BEP20 tokens as fee to dev address
        currencyToken.transferFrom(_buyer, _seller, _sellerTake); // send BEP20 tokens to seller of the NFT

        Ink storage _ink = _inkById[_inkIdByTokenId[_tokenId]];

        delete tokenPriceByTokenId[_tokenId];
        // emit boughtInk(_tokenId, _ink.inkUrl, _buyer, _price);
        emit boughtToken(_tokenId, _ink.inkUrl, _buyer, _price);
    }

    function setFeeTake(uint256 _take) public onlyOwner {
        // only owner can set percentage of fee
        require(_take < 100, "take is more than 99 percent");
        feeTake = _take;
    }

    function setFeeAddress(address payable devAddress) public onlyOwner {
        // only owner can set fee address where the fees go to
        require(devAddress == address(devAddress), "Invalid address");
        feeAddress = devAddress;
    }

    function inkTokenByIndex(string memory inkUrl, uint256 index)
        public
        view
        returns (uint256)
    {
        uint256 _inkId = _inkIdByUrl[inkUrl];
        require(_inkId > 0, "this ink does not exist!");
        Ink storage _ink = _inkById[_inkId];
        require(_ink.count >= index + 1, "this token index does not exist!");
        return _inkTokens[inkUrl].at(index);
    }

    function inkInfoByInkUrl(string memory inkUrl)
        public
        view
        returns (
            uint256,
            address,
            uint256,
            uint256,
            uint256
        )
    {
        uint256 _inkId = _inkIdByUrl[inkUrl];
        require(_inkId > 0, "this ink does not exist!");
        Ink storage _ink = _inkById[_inkId];

        return (_inkId, _ink.artist, _ink.count, _ink.price, _ink.limit);
    }

    function inkIdByUrl(string memory inkUrl) public view returns (uint256) {
        return _inkIdByUrl[inkUrl];
    }

    function inksCreatedBy(address artist) public view returns (uint256) {
        return _artistInks[artist].length();
    }

    function inkOfArtistByIndex(address artist, uint256 index)
        public
        view
        returns (uint256)
    {
        return _artistInks[artist].at(index);
    }

    function inkInfoById(uint256 id)
        public
        view
        returns (
            address,
            uint256,
            string memory,
            uint256,
            uint256
        )
    {
        require(_inkById[id].exists, "this ink does not exist!");
        Ink storage _ink = _inkById[id];

        return (_ink.artist, _ink.count, _ink.inkUrl, _ink.price, _ink.limit);
    }
}
