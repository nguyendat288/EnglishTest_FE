import { Box, Typography } from '@mui/material';
import { BrowserRouter, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from './router/routes';
import { theme } from './theme/theme';

function App() {
  return (
    <>
      <BrowserRouter theme={theme}>
        <Router />
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
