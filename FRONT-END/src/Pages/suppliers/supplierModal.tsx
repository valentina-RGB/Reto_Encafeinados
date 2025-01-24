import * as React from "react";
import { Dialog } from 'primereact/dialog';
import { Button } from "../../components/ui/button";
import { useSupplierService } from "../../api/services/supplier";

interface RegistrarProveedorModalProps {
  visible: boolean;
  onHide: () => void;
  onSuccess: () => void;
}

export function RegistrarProveedorModal({
  visible,
  onHide,
  onSuccess,
}: RegistrarProveedorModalProps) {
  const [nuevoProveedor, setNuevoProveedor] = React.useState({
    nombreProveedor: '',
    correoProveedor: '', 
    telefonoProveedor: '', 
    direccionProveedor: '', 
    bancoProveedor: '', 
    tipoCuenta: '', 
    numeroCuenta: ''
  });

  const [errors, setErrors] = React.useState({
    nombreProveedor: false,
    correoProveedor: false, 
    telefonoProveedor: false, 
    direccionProveedor: false, 
    bancoProveedor: false, 
    tipoCuenta: false, 
    numeroCuenta: false
  });

  const { create } = useSupplierService();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    const re = /^[0-9]{9,12}$/; // Adjust regex based on your phone number format
    return re.test(phone);
  };

  const validateForm = () => {
    const newErrors = {
      nombreProveedor: !nuevoProveedor.nombreProveedor.trim(),
      correoProveedor: !validateEmail(nuevoProveedor.correoProveedor),
      telefonoProveedor: !validatePhone(nuevoProveedor.telefonoProveedor),
      direccionProveedor: !nuevoProveedor.direccionProveedor.trim(),
      bancoProveedor: !nuevoProveedor.bancoProveedor.trim(),
      tipoCuenta: !nuevoProveedor.tipoCuenta,
      numeroCuenta: !nuevoProveedor.numeroCuenta.trim()
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleRegistrarProveedor = async () => {
    if (validateForm()) {
      try {
        await create(nuevoProveedor);
        onHide();
        onSuccess();
      } catch (error) {
        console.error('Error registrando proveedor', error);
      }
    }
  };

  const updateProveedor = (field: string, value: string) => {
    setNuevoProveedor(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    setErrors(prev => ({
      ...prev,
      [field]: false
    }));
  };

  return (
    <Dialog
      header="Registrar Proveedor"
      visible={visible}
      style={{ width: '50vw' }}
      onHide={onHide}
      footer={
        <div className="flex justify-end space-x-2">
          <Button 
            variant="outline" 
            onClick={onHide} 
            className="border-[#c8a78f] text-[#5c412d] hover:bg-[#c8a78f]/10"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleRegistrarProveedor}
            className="bg-[#c8a78f] text-white hover:bg-[#c8a78f]/80"
          >
            Guardar
          </Button>
        </div>
      }
    >
      <div className="p-fluid grid grid-cols-2 gap-4 items-center justify-center">
        <div className="flex flex-col">
          <label 
            htmlFor="nombreProveedor" 
            className="mb-1 mt-3 text-[#5c412d] font-semibold"
          >
            Nombre Proveedor <span className="text-[#5c412d]">*</span>
          </label>
          <input
            id="nombreProveedor"
            type="text"
            value={nuevoProveedor.nombreProveedor}
            onChange={(e) => updateProveedor('nombreProveedor', e.target.value)}
            className={`px-3 py-2 border rounded-md 
                       focus:outline-none focus:ring-2 
                       text-[#5c412d] placeholder-[#5c412d]/50
                       ${errors.nombreProveedor 
                         ? 'border-red-500 focus:ring-red-500/50' 
                         : 'border-[#c8a78f] focus:ring-[#c8a78f]/50'}`}
          />
          {errors.nombreProveedor && 
            <p className="text-red-500 text-sm mt-1">Nombre es requerido</p>
          }
        </div>
        <div className="flex flex-col">
          <label 
            htmlFor="correoProveedor" 
            className="mb-1 mt-3 text-[#5c412d] font-semibold"
          >
            Correo <span className="text-[#5c412d]">*</span>
          </label>
          <input
            id="correoProveedor"
            type="email"
            value={nuevoProveedor.correoProveedor}
            onChange={(e) => updateProveedor('correoProveedor', e.target.value)}
            className={`px-3 py-2 border rounded-md 
                       focus:outline-none focus:ring-2 
                       text-[#5c412d] placeholder-[#5c412d]/50
                       ${errors.correoProveedor 
                         ? 'border-red-500 focus:ring-red-500/50' 
                         : 'border-[#c8a78f] focus:ring-[#c8a78f]/50'}`}
          />
          {errors.correoProveedor && 
            <p className="text-red-500 text-sm mt-1">Correo inválido</p>
          }
        </div>
        {/* Similar modifications for other input fields */}
        <div className="flex flex-col">
          <label 
            htmlFor="telefonoProveedor" 
            className="mb-1 text-[#5c412d] font-semibold"
          >
            Teléfono <span className="text-[#5c412d]">*</span>
          </label>
          <input
            id="telefonoProveedor"
            type="number"
            value={nuevoProveedor.telefonoProveedor}
            onChange={(e) => updateProveedor('telefonoProveedor', e.target.value)}
            className={`px-3 py-2 border rounded-md 
                       focus:outline-none focus:ring-2 
                       text-[#5c412d] placeholder-[#5c412d]/50
                       ${errors.telefonoProveedor 
                         ? 'border-red-500 focus:ring-red-500/50' 
                         : 'border-[#c8a78f] focus:ring-[#c8a78f]/50'}`}
          />
          {errors.telefonoProveedor && 
            <p className="text-red-500 text-sm mt-1">Teléfono inválido</p>
          }
        </div>
        {/* Remaining fields follow similar pattern */}
        <div className="flex flex-col">
          <label 
            htmlFor="direccionProveedor" 
            className="mb-1 text-[#5c412d] font-semibold"
          >
            Dirección <span className="text-[#5c412d]">*</span>
          </label>
          <input
            id="direccionProveedor"
            type="text"
            value={nuevoProveedor.direccionProveedor}
            onChange={(e) => updateProveedor('direccionProveedor', e.target.value)}
            className={`px-3 py-2 border rounded-md 
                       focus:outline-none focus:ring-2 
                       text-[#5c412d] placeholder-[#5c412d]/50
                       ${errors.direccionProveedor 
                         ? 'border-red-500 focus:ring-red-500/50' 
                         : 'border-[#c8a78f] focus:ring-[#c8a78f]/50'}`}
          />
          {errors.direccionProveedor && 
            <p className="text-red-500 text-sm mt-1">Dirección es requerida</p>
          }
        </div>
        <div className="flex flex-col">
          <label 
            htmlFor="bancoProveedor" 
            className="mb-1 text-[#5c412d] font-semibold"
          >
            Banco <span className="text-[#5c412d]">*</span>
          </label>
          <input
            id="bancoProveedor"
            value={nuevoProveedor.bancoProveedor}
            type="text"
            onChange={(e) => updateProveedor('bancoProveedor', e.target.value)}
            className={`px-3 py-2 border rounded-md 
                       focus:outline-none focus:ring-2 
                       text-[#5c412d] placeholder-[#5c412d]/50
                       ${errors.bancoProveedor 
                         ? 'border-red-500 focus:ring-red-500/50' 
                         : 'border-[#c8a78f] focus:ring-[#c8a78f]/50'}`}
          />
          {errors.bancoProveedor && 
            <p className="text-red-500 text-sm mt-1">Banco es requerido</p>
          }
        </div>
        <div className="flex flex-col">
          <label 
            htmlFor="tipoCuenta" 
            className="mb-1 text-[#5c412d] font-semibold"
          >
            Tipo de Cuenta <span className="text-[#5c412d]">*</span>
          </label>
          <select
            id="tipoCuenta"
            value={nuevoProveedor.tipoCuenta}
            onChange={(e) => updateProveedor('tipoCuenta', e.target.value)}
            className={`px-3 py-2 border rounded-md 
                       focus:outline-none focus:ring-2 
                       text-[#5c412d] appearance-none
                       ${errors.tipoCuenta 
                         ? 'border-red-500 focus:ring-red-500/50' 
                         : 'border-[#c8a78f] focus:ring-[#c8a78f]/50'}`}
          >
            <option value="">Selecciona un Tipo de Cuenta</option>
            <option value="Ahorro">Ahorro</option>
            <option value="Corriente">Corriente</option>
          </select>
          {errors.tipoCuenta && 
            <p className="text-red-500 text-sm mt-1">Selecciona un tipo de cuenta</p>
          }
        </div>
        <div className="col-span-2 flex flex-col">
          <label 
            htmlFor="numeroCuenta" 
            className="mb-1 text-[#5c412d] font-semibold"
          >
            Número de Cuenta <span className="text-[#5c412d]">*</span>
          </label>
          <input
            id="numeroCuenta"
            type="number"
            value={nuevoProveedor.numeroCuenta}
            onChange={(e) => updateProveedor('numeroCuenta', e.target.value)}
            className={`px-3 py-2 border rounded-md 
                       focus:outline-none focus:ring-2 
                       text-[#5c412d] placeholder-[#5c412d]/50
                       ${errors.numeroCuenta 
                         ? 'border-red-500 focus:ring-red-500/50' 
                         : 'border-[#c8a78f] focus:ring-[#c8a78f]/50'}`}
          />
          {errors.numeroCuenta && 
            <p className="text-red-500 text-sm mt-1">Número de cuenta es requerido</p>
          }
        </div>
      </div>
    </Dialog>
  );
}