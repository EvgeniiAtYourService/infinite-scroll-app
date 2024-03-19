import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// REMOVE STRICT MODE NOT TO CALL USE EFFECT TWO TIMES

root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);
