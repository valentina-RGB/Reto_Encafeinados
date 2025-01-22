import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import FormularioPaginado from './views/Partials/Shopping/form_details'
// import App from './App.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FormularioPaginado/>
  </StrictMode>,
)
