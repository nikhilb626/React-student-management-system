import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {GlobalProvider} from "./context/students/globalState";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>

  <GlobalProvider>

  <React.StrictMode>
    <App />
  </React.StrictMode>
  </GlobalProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

