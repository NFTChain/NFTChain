{"address":"0x5FbDB2315678afecb367f032d93F642f64180aa3","abi":[{"type":"constructor","payable":false,"inputs":[{"type":"bytes32[]","name":"assetsForSale"}]},{"type":"event","anonymous":false,"name":"Approval","inputs":[{"type":"address","name":"owner","indexed":true},{"type":"address","name":"approved","indexed":true},{"type":"uint256","name":"tokenId","indexed":true}]},{"type":"event","anonymous":false,"name":"ApprovalForAll","inputs":[{"type":"address","name":"owner","indexed":true},{"type":"address","name":"operator","indexed":true},{"type":"bool","name":"approved","indexed":false}]},{"type":"event","anonymous":false,"name":"Transfer","inputs":[{"type":"address","name":"from","indexed":true},{"type":"address","name":"to","indexed":true},{"type":"uint256","name":"tokenId","indexed":true}]},{"type":"function","name":"approve","constant":false,"payable":false,"inputs":[{"type":"address","name":"to"},{"type":"uint256","name":"tokenId"}],"outputs":[]},{"type":"function","name":"balanceOf","constant":true,"stateMutability":"view","payable":false,"inputs":[{"type":"address","name":"owner"}],"outputs":[{"type":"uint256"}]},{"type":"function","name":"baseURI","constant":true,"stateMutability":"view","payable":false,"inputs":[],"outputs":[{"type":"string"}]},{"type":"function","name":"forSale","constant":true,"stateMutability":"view","payable":false,"inputs":[{"type":"bytes32"}],"outputs":[{"type":"bool"}]},{"type":"function","name":"getApproved","constant":true,"stateMutability":"view","payable":false,"inputs":[{"type":"uint256","name":"tokenId"}],"outputs":[{"type":"address"}]},{"type":"function","name":"isApprovedForAll","constant":true,"stateMutability":"view","payable":false,"inputs":[{"type":"address","name":"owner"},{"type":"address","name":"operator"}],"outputs":[{"type":"bool"}]},{"type":"function","name":"mintItem","constant":false,"payable":false,"inputs":[{"type":"string","name":"tokenURI"}],"outputs":[{"type":"uint256"}]},{"type":"function","name":"name","constant":true,"stateMutability":"view","payable":false,"inputs":[],"outputs":[{"type":"string"}]},{"type":"function","name":"ownerOf","constant":true,"stateMutability":"view","payable":false,"inputs":[{"type":"uint256","name":"tokenId"}],"outputs":[{"type":"address"}]},{"type":"function","name":"safeTransferFrom","constant":false,"payable":false,"inputs":[{"type":"address","name":"from"},{"type":"address","name":"to"},{"type":"uint256","name":"tokenId"}],"outputs":[]},{"type":"function","name":"safeTransferFrom","constant":false,"payable":false,"inputs":[{"type":"address","name":"from"},{"type":"address","name":"to"},{"type":"uint256","name":"tokenId"},{"type":"bytes","name":"_data"}],"outputs":[]},{"type":"function","name":"setApprovalForAll","constant":false,"payable":false,"inputs":[{"type":"address","name":"operator"},{"type":"bool","name":"approved"}],"outputs":[]},{"type":"function","name":"supportsInterface","constant":true,"stateMutability":"view","payable":false,"inputs":[{"type":"bytes4","name":"interfaceId"}],"outputs":[{"type":"bool"}]},{"type":"function","name":"symbol","constant":true,"stateMutability":"view","payable":false,"inputs":[],"outputs":[{"type":"string"}]},{"type":"function","name":"tokenByIndex","constant":true,"stateMutability":"view","payable":false,"inputs":[{"type":"uint256","name":"index"}],"outputs":[{"type":"uint256"}]},{"type":"function","name":"tokenOfOwnerByIndex","constant":true,"stateMutability":"view","payable":false,"inputs":[{"type":"address","name":"owner"},{"type":"uint256","name":"index"}],"outputs":[{"type":"uint256"}]},{"type":"function","name":"tokenURI","constant":true,"stateMutability":"view","payable":false,"inputs":[{"type":"uint256","name":"tokenId"}],"outputs":[{"type":"string"}]},{"type":"function","name":"totalSupply","constant":true,"stateMutability":"view","payable":false,"inputs":[],"outputs":[{"type":"uint256"}]},{"type":"function","name":"transferFrom","constant":false,"payable":false,"inputs":[{"type":"address","name":"from"},{"type":"address","name":"to"},{"type":"uint256","name":"tokenId"}],"outputs":[]},{"type":"function","name":"uriToTokenId","constant":true,"stateMutability":"view","payable":false,"inputs":[{"type":"bytes32"}],"outputs":[{"type":"uint256"}]}]}