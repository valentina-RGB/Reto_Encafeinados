import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-lg font-bold">Encafeinados</div>
        <nav className="flex-grow">
          <ul className="space-y-2 p-4">
            <li>
              <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-700 rounded">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/productos" className="block px-4 py-2 hover:bg-gray-700 rounded">
                Productos
              </Link>
            </li>
            <li>
              <Link to="/proveedores" className="block px-4 py-2 hover:bg-gray-700 rounded">
                Proveedores
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4">
          <button
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-grow bg-gray-100 p-6">
        <Outlet /> {/* Aquí se renderizan las páginas */}
      </main>
    </div>
  );
};

export default Layout;
