/** @jsx jsx */
import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import { css, jsx } from '@emotion/core';
import { Redirect, Router } from '@reach/router';
import { FC } from 'react';
import config from './auth-config.json';
import { PrivateRoute } from './components/private-route';
import { Auth0Provider } from './react-auth0-spa';
import { Authorized } from './views/authorized';
import { Home } from './views/home';
import { Login } from './views/login';

const rootStyles = css({
  display: 'flex',
  flexFlow: 'column',
  height: '100vh',

  '& > div': {
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
  },
});

export const App: FC = () => {
  return (
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      redirect_uri={`${window.location.origin}/authorized`}
    >
      <ThemeProvider>
        <CSSReset />
        <Router className="test" css={rootStyles}>
          <PrivateRoute path="/">
            <Home path="home" />
          </PrivateRoute>
          <Authorized path="authorized" />
          <Login path="login" />
          <Redirect noThrow from="/" to="home" />
        </Router>
      </ThemeProvider>
    </Auth0Provider>
  );
};
