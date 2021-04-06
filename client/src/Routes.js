import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import WithLayout from 'WithLayout';
// Available layouts
import { Main as MainLayout, Fluid as FluidLayout } from './layouts';

// Landing pages
import { Home as HomeView, Crypto as CryptoView } from './views/landingPages';

// Authentication pages
import {
  Login as LoginView,
  LoginSimple as LoginSimpleView,
  Signup as SignupView,
  SignupSimple as SignupSimpleView,
  ForgotPassword as ForgotPasswordView,
  ForgotPasswordSimple as ForgotPasswordSimpleView,
} from './views/authPages';

const Routes = () => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(matchProps) => (
          <WithLayout
            {...matchProps}
            component={HomeView}
            layout={MainLayout}
          />
        )}
      />
      <Route
        exact
        path="/landing-crypto"
        render={(matchProps) => (
          <WithLayout
            {...matchProps}
            component={CryptoView}
            layout={MainLayout}
          />
        )}
      />
      <Route
        exact
        path="/page-login"
        render={(matchProps) => (
          <WithLayout
            {...matchProps}
            component={LoginView}
            layout={FluidLayout}
          />
        )}
      />
      <Route
        exact
        path="/page-login-simple"
        render={(matchProps) => (
          <WithLayout
            {...matchProps}
            component={LoginSimpleView}
            layout={MainLayout}
          />
        )}
      />
      <Route
        exact
        path="/page-signup"
        render={(matchProps) => (
          <WithLayout
            {...matchProps}
            component={SignupView}
            layout={FluidLayout}
          />
        )}
      />
      <Route
        exact
        path="/page-signup-simple"
        render={(matchProps) => (
          <WithLayout
            {...matchProps}
            component={SignupSimpleView}
            layout={MainLayout}
          />
        )}
      />
      <Route
        exact
        path="/page-forgot-password"
        render={(matchProps) => (
          <WithLayout
            {...matchProps}
            component={ForgotPasswordView}
            layout={FluidLayout}
          />
        )}
      />
      <Route
        exact
        path="/page-forgot-password-simple"
        render={(matchProps) => (
          <WithLayout
            {...matchProps}
            component={ForgotPasswordSimpleView}
            layout={MainLayout}
          />
        )}
      />
      <Redirect to="/page-not-found" />
    </Switch>
  );
};

export default Routes;
