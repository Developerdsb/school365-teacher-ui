import React from 'react';
import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import themes from './themes';
import ToastBar from './ui-component/ToastBar';
import '../src/app.css'


const App = () => {
  const customization = useSelector((state) => state.customization);
  return (
    <ThemeProvider theme={themes(customization)}>
      <CssBaseline />
      <BrowserRouter basename="/">
        <React.StrictMode>
          <ToastBar />
          <Routes />
        </React.StrictMode>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
