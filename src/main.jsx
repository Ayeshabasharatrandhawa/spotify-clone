import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import PlayerContextProvider from './Context/PlayerContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PlayerContextProvider>
      <App /> 
    </PlayerContextProvider>
  </StrictMode>,
);
