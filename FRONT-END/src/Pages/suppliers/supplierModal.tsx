import * as React from "react";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
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

  const { create } = useSupplierService();

  const handleRegistrarProveedor = async () => {
    try {
      console.log('Registrando proveedor', nuevoProveedor);

      await create(nuevoProveedor);
      onHide();
      onSuccess();
    } catch (error) {
      console.error('Error registrando proveedor', error);
    }
  };

  const updateProveedor = (field: string, value: string) => {
    setNuevoProveedor(prev => ({
      ...prev,
      [field]: value
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
          <Button variant="outline" onClick={onHide}>
            Cancelar
          </Button>
          <Button onClick={handleRegistrarProveedor}>
            Guardar
          </Button>
        </div>
      }
    >
      <div className="p-fluid grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="nombreProveedor" className="block mb-2">Nombre Proveedor</label>
          <InputText
            id="nombreProveedor"
            value={nuevoProveedor.nombreProveedor}
            onChange={(e) => updateProveedor('nombreProveedor', e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="correoProveedor" className="block mb-2">Correo</label>
          <InputText
            id="correoProveedor"
            value={nuevoProveedor.correoProveedor}
            onChange={(e) => updateProveedor('correoProveedor', e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="telefonoProveedor" className="block mb-2">Teléfono</label>
          <InputText
            id="telefonoProveedor"
            value={nuevoProveedor.telefonoProveedor}
            onChange={(e) => updateProveedor('telefonoProveedor', e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="direccionProveedor" className="block mb-2">Dirección</label>
          <InputText
            id="direccionProveedor"
            value={nuevoProveedor.direccionProveedor}
            onChange={(e) => updateProveedor('direccionProveedor', e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="bancoProveedor" className="block mb-2">Banco</label>
          <InputText
            id="bancoProveedor"
            value={nuevoProveedor.bancoProveedor}
            onChange={(e) => updateProveedor('bancoProveedor', e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="tipoCuenta" className="block mb-2">Tipo de Cuenta</label>
          <select
            id="tipoCuenta"
            value={nuevoProveedor.tipoCuenta}
            onChange={(e) => updateProveedor('tipoCuenta', e.target.value)}
            className="w-full border border-cafe-300 rounded-md p-2">
            <option value="">Selecciona un Tipo de Cuenta</option>
            <option value="Ahorro">Ahorro</option>
            <option value="Corriente">Corriente</option>
          </select>
        </div>

        <div>
          <label htmlFor="numeroCuenta" className="block mb-2">Número de Cuenta</label>
          <InputText
            id="numeroCuenta"
            value={nuevoProveedor.numeroCuenta}
            onChange={(e) => updateProveedor('numeroCuenta', e.target.value)}
            className="w-full"
          />
        </div>
      </div>
    </Dialog>
  );
}