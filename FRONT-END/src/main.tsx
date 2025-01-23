import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';

import App from './App.tsx';

import 'primereact/resources/themes/lara-light-indigo/theme.css'; // Tema de PrimeReact
import 'primereact/resources/primereact.min.css'; // Estilos principales de PrimeReact
import 'primeicons/primeicons.css'; // Íconos de PrimeIcons
import 'primeflex/primeflex.css'; // Utilidades de PrimeFlex
import './App.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </Router>
  </StrictMode>
);
