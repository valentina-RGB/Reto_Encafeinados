import * as React from "react";
import { Dialog } from 'primereact/dialog';
// import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
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
      console.log('Registrando abono', depositData);
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
          <Button variant="outline" onClick={onHide}>
            Cancelar
          </Button>
          <Button onClick={handleRegistrarAbono}>
            Confirmar
          </Button>
        </div>
      }
    >
      <div className="p-fluid space-y-4">
        {/* <div>
          <label className="block mb-2">ID Proveedor</label>
          <InputText 
            value={supplier.idProveedor} 
            disabled 
          />
        </div> */}

        <div>
          <label htmlFor="metodoPago" className="block mb-2">Método de Pago</label>
          <select
            id="metodoPago"
            value={depositData.metodoPago}
            onChange={(e) => setDepositData(prev => ({
              ...prev,
              metodoPago: e.target.value
            }))}
            className="w-full border border-cafe-300 rounded-md p-2">
            <option value="">Selecciona un método de pago</option>
            <option value="transferencia">Transferencia</option>
            <option value="efectivo">Efectivo</option>
          </select>
        </div>


        <div>
          <label htmlFor="monto" className="block mb-2">Monto a Abonar</label>
          <InputNumber
            id="monto"
            value={depositData.monto}
            onValueChange={(e) => setDepositData(prev => ({
              ...prev,
              monto: e.value || 0
            }))}
            mode="currency"
            currency="MXN"
            locale="es-MX"
          />
        </div>

        <div>
          <label htmlFor="referencia" className="block mb-2">Referencia</label>

          <input
            type="text"
            id="referencia"
            value={depositData.referencia}
            onChange={(e) => setDepositData(prev => ({
              ...prev,
              referencia: e.target.value
            }))}
            className="w-full border border-cafe-300 rounded-md p-2"
          />

        </div>
      </div>


    </Dialog>
  );
}