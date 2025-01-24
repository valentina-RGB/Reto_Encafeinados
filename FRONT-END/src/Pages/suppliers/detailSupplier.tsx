import { Dialog } from 'primereact/dialog';
import { Button } from "../../components/ui/button";
import { supplierLiquidationType } from "../../types";

interface DetalleProveedorModalProps {
  visible: boolean;
  onHide: () => void;
  supplier: supplierLiquidationType;
}

export function DetalleProveedorModal({ 
  visible, 
  onHide, 
  supplier 
}: DetalleProveedorModalProps) {
  return (
    <Dialog 
      header="Detalle de Proveedor" 
      visible={visible} 
      style={{ width: '50vw' }} 
      onHide={onHide}
      footer={
        <Button variant="outline" onClick={onHide}>
          Cerrar
        </Button>
      }
    >
      <div className="space-y-4">
        <div>
          <strong>ID Liquidación:</strong> {supplier.idLiquidacion}
        </div>
        <div>
          <strong>ID Proveedor:</strong> {supplier.idProveedor}
        </div>
        <div>
          <strong>Deuda Actual:</strong> ${supplier.deudaActual}
        </div>
        <div>
          <strong>Estado:</strong> {supplier.estadoLiquidacion}
        </div>
      </div>
    </Dialog>
  );
}