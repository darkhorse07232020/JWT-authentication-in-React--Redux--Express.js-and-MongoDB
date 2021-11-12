import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toast';
import { useDispatch } from 'react-redux';
import PrivateRoute from 'routes/PrivateRoute';
import AuthRoute from 'routes/AuthRoute';
import Dashboard from 'pages/Dashboard';
import { autoLoginUser } from 'store/auth';
import ConfirmPage from 'pages/Auth/Confirm';
import ForgotPassword from 'pages/Auth/ForgotPassword';
import ResetPassword from 'pages/Auth/ForgotPassword/ResetPassword';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoLoginUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <Route path="/auth" component={AuthRoute} />
          <Route path="/confirm/:confirmationCode" component={ConfirmPage} />
          <Route path="/reset-password" exact component={ForgotPassword} />
          <Route path="/reset-password/:confirmationCode" component={ResetPassword} />
          <Redirect to="/auth" from="/" />
        </Switch>
      </BrowserRouter>
      <ToastContainer delay={5000} position="top-right" />
    </>
  );
}

export default App;
