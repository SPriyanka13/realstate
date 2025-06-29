import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ Notice `.client`
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root')); // ✅ createRoot

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
