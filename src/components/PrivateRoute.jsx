// src/router/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ children, rolesAllowed = [] }) => {
  const { status, user } = useSelector(state => state.auth);
  console.log(status,user)
  if (status === 'checking') return <p>Cargando...</p>;

  if (status !== 'authenticated') return <Navigate to="/login" />;

  if (rolesAllowed.length && !rolesAllowed.includes(user.uid)) {
    return <Navigate to="/" />;
  }

  return children;
};
