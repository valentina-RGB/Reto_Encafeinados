import { useState } from "react";
import { loginService } from "../api/services/authService";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [correoUsuario, setEmail] = useState("");
  const [claveUsuario, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
  
    const { login } = loginService();
    try {
      const response = await login({ correoUsuario, claveUsuario });
      console.log(correoUsuario, claveUsuario);
  
      localStorage.setItem("token", response.token);
      console.log(response);
  
      navigate("/user");
    } catch (err) {
      setError("Credenciales inválidas. Inténtalo de nuevo.");
    }
  };  

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">Correo:</label>
        <input
          type="email"
          id="correoUsuario"
          value={correoUsuario}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-2">Contraseña:</label>
        <input
          type="password"
          id="claveUsuario"
          value={claveUsuario}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
        Iniciar Sesión
      </button>
    </form>
  );
};

export default Login;
