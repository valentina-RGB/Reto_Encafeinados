import { Card } from "../components/ui/card";
import { Button } from "primereact/button"; // Botón de PrimeReact

const menuItems = [

  {
    title: "Consignaciones",
    description: "Registrar Consignación",
    icon: "pi pi-cart-arrow-down",
  },
  {
    title: "Salidas del Inventario",
    description: "Registrar Venta o Ajuste",
    icon: "pi pi-dollar",
  },
  {
    title: "Proveedores",
    description: "Ver Deuda a Proveedores",
    icon: "pi pi-truck",
  },
  {
    title: "Productos",
    description: "Ver Productos Disponibles",
    icon: "pi pi-box",
  },
];

const MenuPageStore = () => {
  const redirectTo = (title: string) => {
    if (title === "Productos") {
      window.location.href = "/product";
    } else if (title === "Consignaciones") {
      window.location.href = "/sales";
    } else if (title === "Salidas del Inventario") {
      window.location.href = "/sales";
    } else if (title === "Proveedores") {
      window.location.href = "/suppliers";
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f4f4] font-sans flex items-center justify-center">
      <div className="mx-auto max-w-[960px] px-4 py-5">
        {/* Encabezado */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black tracking-tight text-[#151313]">Bienvenido a Encafeinados</h1>
          <p className="mt-2 text-base text-[#766b6c]">¿Qué quieres hacer hoy?</p>
        </div>

        {/* Grid de opciones */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item) => (
            <Card
              key={item.title}
              className="flex flex-col gap-3 border-[#dbd7d7] bg-[#f5f4f4] p-4 transition-colors hover:bg-cafe-200"
              onClick={() => redirectTo(item.title)}
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
                onClick={() => redirectTo(item.title)}
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPageStore;