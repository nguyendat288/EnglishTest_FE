import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { CssBaseline } from '@mui/material';
import ChatProvider from './providers/ConnectContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ChatProvider>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <CssBaseline />
        <App />
      </React.StrictMode>
    </PersistGate>
    </ChatProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
