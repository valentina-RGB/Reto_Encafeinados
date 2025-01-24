import { Card } from "../components/ui/card";
import { Button } from "primereact/button"; // Botón de PrimeReact

const menuItems = [
  {
    title: "Productos",
    description: "Gestionar inventario y precios",
    icon: "pi pi-box", 
  },
  {
    title: "Consignaciones",
    description: "Registrar Consignaciones",
    icon: "pi pi-dollar", 
  },
  {
    title: "Balance de Ventas",
    description: "Ver el Balance de Ventas",
    icon: "pi pi-chart-bar", 
  },
];

export default function MenuPageSuppliers() {
  return (
    <div className="min-h-screen bg-[#f5f4f4] font-sans flex items-center justify-center">
      <div className="mx-auto max-w-[960px] px-4 py-5">
        {/* Encabezado */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black tracking-tight text-[#151313]">Bienvenido proveedor "" a Encafeinados</h1>
          <p className="mt-2 text-base text-[#766b6c]">¿Qué quieres hacer hoy?</p>
        </div>

        {/* Grid de opciones */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item) => (
            <Card
              key={item.title}
              className="flex flex-col gap-3 border-[#dbd7d7] bg-[#f5f4f4] p-4 transition-colors hover:bg-orange-500" 
            >
              {/* Icono */}
              <div className="text-[#151314]">
                <i className={`${item.icon} text-3xl`} /> {/* Icono de PrimeIcons */}
              </div>

              {/* Contenido */}
              <div className="flex flex-col gap-1">
                <h2 className="text-base font-bold text-[#151314]">{item.title}</h2>
                <p className="text-sm text-[#766b6c]">{item.description}</p>
              </div>

              {/* Botón de acción */}
              <Button
                label="Seleccionar"
                className="p-button-rounded p-button-outline mt-2"
                icon="pi pi-chevron-right"
                style={{ width: "fit-content", alignSelf: "center" }}
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
