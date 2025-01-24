import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "../../components/ui/button";
import { supplierLiquidationType } from "../../types";
import { useSettlementsService } from "../../api/services/settlement";

interface DetalleProveedorModalProps {
  visible: boolean;
  onHide: () => void;
  supplier: supplierLiquidationType | null;
}

const { getById } = useSettlementsService();

export function DetalleProveedorModal({
  visible,
  onHide,
  supplier
}: DetalleProveedorModalProps) {
  const [products, setProducts] = React.useState<any[]>([]); // Inicializa como array vacío
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (visible && supplier) {
      setLoading(true);
      setError(null);
      getById(supplier.idProveedor)
        .then((data) => {
          console.log("Datos obtenidos de getById:", data);
          if (!data || !Array.isArray(data)) {
            throw new Error("Los datos obtenidos no son válidos.");
          }
          const filteredProducts = data.filter(
            (product) => product.idProveedor === supplier.idProveedor
          );
          console.log("Productos filtrados:", filteredProducts);
          setProducts(filteredProducts);
        })
        .catch((error) => {
          console.error("Error al cargar los productos:", error);
          setError("Error al cargar los productos.");
        })
        .finally(() => {
          setLoading(false);
        });


    }
  }, []);


  return (
    <Dialog
      header="Detalle de Proveedor"
      visible={visible}
      style={{ width: '70vw' }}
      onHide={onHide}
      footer={
        <Button variant="outline" onClick={onHide}>
          Cerrar
        </Button>
      }
    >
      {supplier && (
        <div className="space-y-4">
          <div>
            <strong>Nombre Proveedor:</strong> {supplier.nombreProveedor || "N/A"}
          </div>
          <div>
            <strong>Deuda Actual:</strong> {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(Number(supplier.deudaActual || 0))}
          </div>
        </div>
      )}

      <div className="mt-4">
        <h3 className="text-lg font-bold">Productos Vendidos</h3>
        {loading && <p>Cargando productos...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && products.length === 0 && (
          <p>No hay productos relacionados para este proveedor.</p>
        )}
        {!loading && !error && Array.isArray(products) && products.length === 0 && (
          <p>No hay productos relacionados para este proveedor.</p>
        )}
        {!loading && !error && Array.isArray(products) && products.length > 0 && (
          <table className="table-auto w-full mt-4 border">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Producto</th>
                <th className="px-4 py-2 border">Cantidad Vendida</th>
                <th className="px-4 py-2 border">Precio Compra</th>
                <th className="px-4 py-2 border">Total</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{product.producto}</td>
                  <td className="px-4 py-2 border text-center">{product.cantidad_vendida}</td>
                  <td className="px-4 py-2 border text-right">${product.precio_compra}</td>
                  <td className="px-4 py-2 border text-right">${product.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>

    </Dialog>
  );
};