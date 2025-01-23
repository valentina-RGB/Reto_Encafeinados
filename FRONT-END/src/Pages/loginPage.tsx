"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Coffee, User, Lock, Mail, Phone, MapPin, Building, Truck, CreditCard } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [userType, setUserType] = useState<"tienda" | "proveedor" | null>(null)

  const toggleForm = () => {
    setIsLogin(!isLogin)
    setUserType(null)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cafe-100 to-cafe-300">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-xl w-96 max-w-md"
      >
        <div className="flex justify-center mb-6">
          <Coffee className="w-12 h-12 text-cafe-700" />
        </div>
        <h2 className="text-3xl font-bold text-center text-cafe-800 mb-6">
          {isLogin ? "Bienvenido de vuelta" : "Únete a nosotros"}
        </h2>
        <form className="space-y-4">
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
          {isLogin && (
            <>
              <div>
                <Label htmlFor="email" className="text-cafe-700">
                  Correo electrónico
                </Label>
                <Input id="email" type="email" className="border-cafe-300 focus:border-cafe-500" />
              </div>
              <div>
                <Label htmlFor="password" className="text-cafe-700">
                  Contraseña
                </Label>
                <Input id="password" type="password" className="border-cafe-300 focus:border-cafe-500" />
              </div>
            </>
          )}
          {!isLogin && userType === "tienda" && (
            <>
              <div>
                <Label htmlFor="nombreTienda" className="text-cafe-700">
                  Nombre de la Tienda
                </Label>
                <Input id="nombreTienda" type="text" className="border-cafe-300 focus:border-cafe-500" />
              </div>
              <div>
                <Label htmlFor="correoTienda" className="text-cafe-700">
                  Correo de la Tienda
                </Label>
                <Input id="correoTienda" type="email" className="border-cafe-300 focus:border-cafe-500" />
              </div>
              <div>
                <Label htmlFor="telefonoTienda" className="text-cafe-700">
                  Teléfono de la Tienda
                </Label>
                <Input id="telefonoTienda" type="tel" className="border-cafe-300 focus:border-cafe-500" />
              </div>
              <div>
                <Label htmlFor="direccionTienda" className="text-cafe-700">
                  Dirección de la Tienda
                </Label>
                <Input id="direccionTienda" type="text" className="border-cafe-300 focus:border-cafe-500" />
              </div>
            </>
          )}
          {!isLogin && userType === "proveedor" && (
            <>
              <div>
                <Label htmlFor="nombreProveedor" className="text-cafe-700">
                  Nombre del Proveedor
                </Label>
                <Input id="nombreProveedor" type="text" className="border-cafe-300 focus:border-cafe-500" />
              </div>
              <div>
                <Label htmlFor="correoProveedor" className="text-cafe-700">
                  Correo del Proveedor
                </Label>
                <Input id="correoProveedor" type="email" className="border-cafe-300 focus:border-cafe-500" />
              </div>
              <div>
                <Label htmlFor="telefonoProveedor" className="text-cafe-700">
                  Teléfono del Proveedor
                </Label>
                <Input id="telefonoProveedor" type="tel" className="border-cafe-300 focus:border-cafe-500" />
              </div>
              <div>
                <Label htmlFor="direccionProveedor" className="text-cafe-700">
                  Dirección del Proveedor
                </Label>
                <Input id="direccionProveedor" type="text" className="border-cafe-300 focus:border-cafe-500" />
              </div>
              <div>
                <Label htmlFor="bancoProveedor" className="text-cafe-700">
                  Banco del Proveedor
                </Label>
                <Input id="bancoProveedor" type="text" className="border-cafe-300 focus:border-cafe-500" />
              </div>
              <div>
                <Label htmlFor="tipoCuenta" className="text-cafe-700">
                  Tipo de Cuenta
                </Label>
                <Input id="tipoCuenta" type="text" className="border-cafe-300 focus:border-cafe-500" />
              </div>
              <div>
                <Label htmlFor="numeroCuenta" className="text-cafe-700">
                  Número de Cuenta
                </Label>
                <Input id="numeroCuenta" type="text" className="border-cafe-300 focus:border-cafe-500" />
              </div>
              <div>
                <Label htmlFor="estadoProveedor" className="text-cafe-700">
                  Estado del Proveedor
                </Label>
                <Input id="estadoProveedor" type="text" className="border-cafe-300 focus:border-cafe-500" />
              </div>
            </>
          )}
          <Button className="w-full bg-cafe-600 hover:bg-cafe-700 text-white">
            {isLogin ? "Iniciar sesión" : "Registrarse"}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <button onClick={toggleForm} className="text-cafe-600 hover:underline">
            {isLogin ? "¿No tienes una cuenta? Regístrate" : "¿Ya tienes una cuenta? Inicia sesión"}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

