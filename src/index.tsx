import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ToastProvider from './context/Toast';
import UserProvider from './context/User';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ToastProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ToastProvider>
  </React.StrictMode>
);

