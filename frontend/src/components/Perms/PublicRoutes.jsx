import { Navigate, useLocation } from "react-router-dom";

function PublicRoute({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (token) {
    let message = null;
    if (location.pathname === "/login") {
        message = "Ya estás logueado.";
    } else if (location.pathname === "/register") {
        message = "Ya tienes una cuenta.";
    }

    return (<Navigate to="/" replace state={{ message }}/>);
  }

  return children;
}

export default PublicRoute;