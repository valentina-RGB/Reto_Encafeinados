import { Navigate } from "react-router-dom";

import { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />; // Redirige al login si no hay token
  }

  return children;
};

export default PrivateRoute;
