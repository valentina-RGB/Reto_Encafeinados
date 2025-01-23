import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'primereact/resources/themes/saga-blue/theme.css'; // Tema
import 'primereact/resources/primereact.min.css'; // Componentes
import 'primeicons/primeicons.css'; // Iconos

import LoginPage from './Pages/loginPage';
import UserPage from './Pages/userPage';

import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </Router>
  );

}

export default App
