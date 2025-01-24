import { Routes, Route } from 'react-router-dom';

import 'primereact/resources/themes/saga-blue/theme.css'; // Tema
import 'primereact/resources/primereact.min.css'; // Componentes
import 'primeicons/primeicons.css'; // Iconos

import UserPage from './Pages/userPage';
import Layout from './components/layout/layout';

import './App.css'
import Login from './Pages/loginPrueba';
import PrivateRoute from './components/privateRoute';
import Product from './Pages/product';
import SalesPage from './Pages/sales'
import ShopPage from './Pages/sales'
import MenuPageSuppliers from './Pages/menuPageSuppliers';
import MenuPageStore from './Pages/menuPagesStore';
import LoginPage from './Pages/loginPage';
function App() {

  return (

      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/product" element={<Product/>}/>
        <Route path="/sales" element= {<SalesPage/>}/>
        <Route path= "/shop" element= {<ShopPage/>}/>
        <Route path="/menuSuppliers" element={<MenuPageSuppliers/>} />
        <Route path="/menuStore" element={<MenuPageStore/>} />
        
        {/* Rutas protegidas */}
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>

          
          <Route path="/user" element={<UserPage />} />
          <Route path="/product" element={<Product/>}/>
          <Route path="/sales" element= {<SalesPage/>}/>
          <Route path= "/shop" element= {<ShopPage/>}/>
          <Route path= "/login" element= {<LoginPage/>}/>


          {/* <Route path="productos" element={<Productos />} />
          <Route path="proveedores" element={<Proveedores />} /> */}

        </Route>


      </Routes>
  );

}

export default App
