import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { Provider } from 'react-redux';
import store from './modules';

import './index.css';
import App from './App';
import theme from './public/theme';

const rootNode = document.getElementById('root');

ReactDOM.createRoot(rootNode).render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
);
