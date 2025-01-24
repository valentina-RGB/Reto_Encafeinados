import { Routes, Route } from 'react-router-dom';

import 'primereact/resources/themes/saga-blue/theme.css'; // Tema
import 'primereact/resources/primereact.min.css'; // Componentes
import 'primeicons/primeicons.css'; // Iconos

import UserPage from './Pages/userPage';
import Layout from './components/layout/layout';

import './App.css'
import Login from './Pages/loginPage';
import PrivateRoute from './components/privateRoute';
import Product from './Pages/product';
import SalesPage from './Pages/sales'
import ShopPage from './Pages/sales'
import { SuppliersPage } from './Pages/paymentsPage';
import MenuPageSuppliers from './Pages/menuPageSuppliers';
import MenuPageStore from './Pages/menuPagesStore';
import LoginPage from './Pages/loginVale';
import SuppliersViewPage from './Pages/suppliersViewPage';

function App() {

  return (

    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Login />} />


      {/* Rutas protegidas */}

      <Route path="/menuStore" element={<PrivateRoute><MenuPageStore /></PrivateRoute>} />
      <Route path="/menuSuppliers" element={<PrivateRoute><MenuPageSuppliers /></PrivateRoute>} />

      <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>

        <Route path="/suppliersViewPage" element={<SuppliersViewPage />} />
        <Route path="/suppliers" element={<SuppliersPage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/shop" element={<ShopPage />} />

        <Route path="/user" element={<UserPage />} />
        <Route path="/login" element={<LoginPage />} />


        {/* <Route path="productos" element={<Productos />} />
          <Route path="proveedores" element={<Proveedores />} /> */}

      </Route>


    </Routes>
  );

}

export default App