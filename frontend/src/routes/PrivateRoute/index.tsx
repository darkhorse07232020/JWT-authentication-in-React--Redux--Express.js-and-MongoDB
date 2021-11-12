import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { selectAuthStatus, selectUserIsLogin } from 'store/auth/selectors';

export default function PrivateRoute({ component: RouteComponent, path, ...rest }: any) {
  const isLogin = useSelector(selectUserIsLogin);
  const authState = useSelector(selectAuthStatus);

  if (authState === 0 || authState === 1) return null;

  return (
    <Route
      {...rest}
      render={routeProps =>
        isLogin ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={{ pathname: '/auth/login', state: { prevPath: path } }} />
        )
      }
    />
  );
}
