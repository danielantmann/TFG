
import ReactDOM from 'react-dom';
import { BrowserRouter  } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import App from './App';
import { createRoot } from 'react-dom/client';
import React, { StrictMode } from 'react';

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);

