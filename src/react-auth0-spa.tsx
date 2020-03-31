import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import React, { createContext, FC, useContext, useEffect, useState } from 'react';

const DEFAULT_REDIRECT_CALLBACK = () => window.history.replaceState({}, document.title, window.location.pathname);

interface Auth0ProviderProps extends Auth0ClientOptions {
  onRedirectCallback?: Function;
}

export interface AppState {
  targetUrl: string;
}

interface Auth0ContextValue {
  getTokenWithPopup: (...p: any[]) => Promise<string> | undefined;
  logout: (...p: any[]) => void | undefined;
  loginWithPopup: (params?: {}) => Promise<void>;
  popupOpen: boolean;
  loginWithRedirect: (options: { appState?: AppState }) => Promise<void> | undefined;
  handleRedirectCallback: () => Promise<void>;
  getIdTokenClaims: (...p: any[]) => Promise<IdToken> | undefined;
  isAuthenticated: boolean;
  loading: boolean;
  user: any;
  getTokenSilently: (...p: any[]) => Promise<any> | undefined;
}

export const Auth0Context = createContext<Auth0ContextValue>({} as Auth0ContextValue);
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider: FC<Auth0ProviderProps> = (props) => {
  const { children, onRedirectCallback = DEFAULT_REDIRECT_CALLBACK, ...initOptions } = props;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState<Auth0Client>();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);

      if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
        try {
          const { appState } = await auth0FromHook.handleRedirectCallback();

          if (onRedirectCallback) {
            onRedirectCallback(appState);
          }
        } catch (e) {
          console.error(e);
        }
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);
      }

      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client?.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    const user = await auth0Client?.getUser();
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    debugger;
    setLoading(true);
    await auth0Client?.handleRedirectCallback();
    const user = await auth0Client?.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p: any[]) => auth0Client?.getIdTokenClaims(...p),
        loginWithRedirect: (...p: any[]) => auth0Client?.loginWithRedirect(...p),
        getTokenSilently: (...p: any[]) => auth0Client?.getTokenSilently(...p),
        getTokenWithPopup: (...p: any[]) => auth0Client?.getTokenWithPopup(...p),
        logout: (...p: any[]) => auth0Client?.logout(...p),
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
