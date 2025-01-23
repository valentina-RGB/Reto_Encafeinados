import { Routes, Route } from 'react-router-dom';

import 'primereact/resources/themes/saga-blue/theme.css'; // Tema
import 'primereact/resources/primereact.min.css'; // Componentes
import 'primeicons/primeicons.css'; // Iconos

import UserPage from './Pages/userPage';
import Layout from './components/layout/layout';

import './App.css'
import Login from './Pages/loginPrueba';
import PrivateRoute from './components/privateRoute';

function App() {

  return (

      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />

        {/* Rutas protegidas */}

        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          
          <Route path="/user" element={<UserPage />} />

          {/* <Route path="productos" element={<Productos />} />
          <Route path="proveedores" element={<Proveedores />} /> */}

        </Route>


      </Routes>
  );

}

export default App
