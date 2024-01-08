import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <ChakraProvider>
      <Auth0Provider
      domain="dev-i7lha0hexccwsw2d.us.auth0.com"
      clientId="TSGT6JuWiwVOLPc2qjY0bQ6rV6EAYTab"
      redirectUri={window.location.origin}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <App />
      </Auth0Provider>
      </ChakraProvider>
    </BrowserRouter>
);

