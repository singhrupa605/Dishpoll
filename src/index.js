import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SnackbarProvider } from 'notistack';
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "@mui/material/styles";
import {themeOptions} from "./theme";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <SnackbarProvider
    maxSnack={1}
    anchorOrigin={{
      vertical:"bottom",
      horizontal:"center"
    }}
    autoHideDuration={4000}
    preventDuplicate>
      <ThemeProvider theme={themeOptions}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
      </ThemeProvider>
    </SnackbarProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
