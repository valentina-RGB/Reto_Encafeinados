import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
// import FormularioPaginado from './views/Partials/appropriations/form_details'
// import RolPage from './Pages/rolesPage'
import { PrimeReactProvider } from 'primereact/api';
// import LoginPage from './Pages/loginPage'
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // Tema de PrimeReact
import 'primereact/resources/primereact.min.css'; // Estilos principales de PrimeReact
import 'primeicons/primeicons.css'; // Íconos de PrimeIcons
import 'primeflex/primeflex.css'; // Utilidades de PrimeFlex
import UserPage from './Pages/userPage';


// import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider>
    <UserPage/>
    </PrimeReactProvider>
  </StrictMode>,
)
