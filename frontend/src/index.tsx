import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { Auth0Provider } from "@auth0/auth0-react";

console.log(store.getState())

const domain: string = process.env.REACT_APP_AUTH0_DOMAIN as string;
const clientId: string = process.env.REACT_APP_AUTH0_CLIENT_ID as string;
const audience: string = process.env.REACT_APP_API_IDENTIFIER as string;

console.log(audience);

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider  domain={domain} clientId={clientId} redirectUri={window.location.origin} audience={audience} scope="openid profile email">
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);