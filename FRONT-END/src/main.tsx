import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
// import FormularioPaginado from './views/Partials/appropriations/form_details'
import RolPage from './Pages/rolesPage'

// import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RolPage/>
  </StrictMode>,
)
