import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/index.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './components/App/App';
import Login from './components/Modals/Login/Login';
import store from './store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <React.StrictMode>
        <App />
        <Login />
      </React.StrictMode>
    </Provider>
  </BrowserRouter>
);
