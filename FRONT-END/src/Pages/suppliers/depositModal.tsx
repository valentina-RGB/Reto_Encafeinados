import * as React from "react";
import { Dialog } from 'primereact/dialog';
import { Button } from "../../components/ui/button";
import { supplierLiquidationType } from "../../types";
import { useDepositService } from "../../api/services/depositSupplier";

interface RegistrarAbonoModalProps {
  visible: boolean;
  onHide: () => void;
  onSuccess: () => void;
  supplier: supplierLiquidationType;
}

export function RegistrarAbonoModal({
  visible,
  onHide,
  onSuccess,
  supplier
}: RegistrarAbonoModalProps) {
  const [depositData, setDepositData] = React.useState({
    idLiquidacionProveedor: supplier.idLiquidacion,
    fechaPago: new Date(),
    monto: 0,
    metodoPago: '',
    referencia: ''
  });

  const { create } = useDepositService();

  const handleRegistrarAbono = async () => {
    try {
      await create(depositData);
      onSuccess();
      onHide();
    } catch (error) {
      console.error('Error registrando abono', error);
    }
  };

  return (
    <Dialog
      header="Registrar Abono"
      visible={visible}
      style={{ width: '30vw' }}
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
            onClick={handleRegistrarAbono}
            className="bg-[#c8a78f] text-white hover:bg-[#c8a78f]/80"
          >
            Confirmar
          </Button>
        </div>
      }
    >
      <div className="p-fluid grid grid-cols-1 gap-4 justify-center">
        <div className="flex flex-col mt-2">
          <label 
            htmlFor="metodoPago" 
            className="mb-1 text-[#5c412d] font-semibold"
          >
            Método de Pago <span className="text-[#5c412d]">*</span>
          </label>
          <select
            id="metodoPago"
            value={depositData.metodoPago}
            onChange={(e) => setDepositData(prev => ({
              ...prev,
              metodoPago: e.target.value
            }))}
            className="px-3 py-2 border border-[#c8a78f] rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-[#c8a78f]/50 
                       text-[#5c412d] appearance-none"
          >
            <option value="">Selecciona un método de pago</option>
            <option value="transferencia">Transferencia</option>
            <option value="efectivo">Efectivo</option>
          </select>
        </div>

        <div className="flex flex-col mt-1">
          <label 
            htmlFor="monto" 
            className="mb-1 text-[#5c412d] font-semibold"
          >
            Monto a Abonar <span className="text-[#5c412d]">*</span>
          </label>
          <input
            type="number"
            id="monto"
            value={depositData.monto}
            onChange={(e) => setDepositData(prev => ({
              ...prev,
              monto: Number(e.target.value)
            }))}
            className="px-3 py-2 border border-[#c8a78f] rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-[#c8a78f]/50 
                       text-[#5c412d] placeholder-[#5c412d]/50"
            placeholder="Ingrese el monto"
          />
        </div>

        <div className="flex flex-col">
          <label 
            htmlFor="referencia" 
            className="mb-1 text-[#5c412d] font-semibold"
          >
            Referencia
          </label>
          <input
            type="text"
            id="referencia"
            value={depositData.referencia}
            onChange={(e) => setDepositData(prev => ({
              ...prev,
              referencia: e.target.value
            }))}
            className="px-3 py-2 border border-[#c8a78f] rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-[#c8a78f]/50 
                       text-[#5c412d] placeholder-[#5c412d]/50"
            placeholder="Ingrese la referencia"
          />
        </div>
      </div>
    </Dialog>
  );
};