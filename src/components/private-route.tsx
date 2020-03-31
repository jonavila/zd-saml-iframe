import { Redirect, RouteComponentProps } from '@reach/router';
import React, { FC, Fragment } from 'react';
import { useAuth0 } from '../react-auth0-spa';

export const PrivateRoute: FC<RouteComponentProps> = (props) => {
  const { children } = props;
  const { loading, isAuthenticated } = useAuth0();


  return <Fragment>{isAuthenticated || loading ? children : <Redirect noThrow to="login" />}</Fragment>;
};
