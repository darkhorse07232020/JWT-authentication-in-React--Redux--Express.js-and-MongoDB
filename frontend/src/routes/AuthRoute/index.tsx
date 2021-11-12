import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from 'pages/Auth/Login';
import Register from 'pages/Auth/Register';
import AuthLayout from 'layouts/AuthLayout';
import AuthWrapper from 'layouts/AuthLayout/AuthWrapper';

const AuthRoute: React.FC = () => (
  <AuthLayout>
    <AuthWrapper>
      <Switch>
        <Route exact path="/auth/login" component={Login} />
        <Route exact path="/auth/register" component={Register} />
        <Redirect to="/auth/login" from="/auth" />
      </Switch>
    </AuthWrapper>
  </AuthLayout>
);

export default AuthRoute;
