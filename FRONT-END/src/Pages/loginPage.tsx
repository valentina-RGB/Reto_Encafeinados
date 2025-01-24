"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Coffee } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { useNavigate } from "react-router-dom";
import { loginService } from "../api/services/authService";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<"tienda" | "proveedor" | null>(null);
  const [correoUsuario, setCorreoUsuario] = useState("");
  const [claveUsuario, setClaveUsuario] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setUserType(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { login } = loginService();
    try {
      const response = await login({ correoUsuario, claveUsuario });
      localStorage.setItem("token", response.token);
      navigate("/user");
    } catch (err) {
      setError("Credenciales inválidas. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cafe-100 to-cafe-300">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl"
      >
        <div className="flex justify-center mb-6">
          <Coffee className="w-12 h-12 text-cafe-700" />
        </div>
        <h2 className="text-3xl font-bold text-center text-cafe-800 mb-6">
          {isLogin ? "Bienvenido de vuelta" : "Únete a nosotros"}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && !userType && (
            <RadioGroup
              onValueChange={(value) => setUserType(value as "tienda" | "proveedor")}
              className="flex justify-center space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tienda" id="tienda" />
                <Label htmlFor="tienda">Tienda</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="proveedor" id="proveedor" />
                <Label htmlFor="proveedor">Proveedor</Label>
              </div>
            </RadioGroup>
          )}

          {/* Formulario de inicio de sesión */}
          {isLogin && (
            <>
              <div>
                <Label htmlFor="correoUsuario" className="text-cafe-700">
                  Correo electrónico
                </Label>
                <Input
                  id="correoUsuario"
                  type="email"
                  value={correoUsuario}
                  onChange={(e) => setCorreoUsuario(e.target.value)}
                  className="border-cafe-300 focus:border-cafe-500 rounded-md"
                />
              </div>
              <div>
                <Label htmlFor="claveUsuario" className="text-cafe-700">
                  Contraseña
                </Label>
                <Input
                  id="claveUsuario"
                  type="password"
                  value={claveUsuario}
                  onChange={(e) => setClaveUsuario(e.target.value)}
                  className="border-cafe-300 focus:border-cafe-500 rounded-md"
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </>
          )}

          {/* Botón de registro o login */}
          <Button type="submit" className="w-full bg-cafe-600 hover:bg-cafe-700 text-white">
            {isLogin ? "Iniciar sesión" : "Registrarse"}
          </Button>
        </form>

        {/* Botón para alternar entre login y registro */}
        <div className="mt-4 text-center">
          <button onClick={toggleForm} className="text-cafe-600 hover:underline">
            {isLogin ? "¿No tienes una cuenta? Regístrate" : "¿Ya tienes una cuenta? Inicia sesión"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
