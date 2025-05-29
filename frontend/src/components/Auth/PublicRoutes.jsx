import { Navigate, useLocation } from "react-router-dom";

function PublicRoutes({ children }) {
    const token = localStorage.getItem("token");
    const location = useLocation();

    if (token) {
        let message = null;
        if (location.pathname === "/login") {
            message = "Ya estás autenticado. Redirigiendo a la página principal.";
        } else if (location.pathname === "/register") {
            message = "Ya estás autenticado. Redirigiendo a la página principal.";
        }

        return (
            <Navigate
                to="/"
                state={{ message }}
                replace
            />
        );

    }
    return children;
}

export default PublicRoutes;
    