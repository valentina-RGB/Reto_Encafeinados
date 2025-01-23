import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="h-screen flex flex-col bg-[#F5F5F5]">
      {/* Topbar */}
      <header className="fixed top-2 left-2 right-2 h-14 bg-[#6F4E37] text-white shadow-md flex items-center justify-between px-4 z-50 rounded-lg">
        {/* Botón de regresar */}
        <Button 
          icon="pi pi-arrow-left" 
          className="p-button-text text-white hover:bg-[#D2691E]" 
          onClick={() => navigate(-1)} 
        />
        
        {/* Logo */}
        <h4>Encafeinados</h4>
        {/* <img 
          src="/logo-name.JPG" 
          alt="Encafeinados" 
          className="h-8 object-contain" 
        /> */}
        
        {/* Botones de usuario y cerrar sesión */}
        <div className="flex items-center gap-4">
          <Button 
            icon="pi pi-user" 
            className="p-button-text text-white hover:bg-[#D2691E]" 
            onClick={() => console.log("Abrir perfil")} 
          />
          <Button 
            icon="pi pi-sign-out" 
            className="p-button-text text-white hover:bg-[#F4A460]" 
            onClick={handleLogout} 
          />
        </div>
      </header>
      
      {/* Main Content */}
      <main className="mt-20 mb-2 mx-2 flex-1 overflow-y-auto">
        <div className="p-4 bg-white border-[#6F4E37] border rounded-lg shadow-md h-full">
          {/* Contenido principal */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;