import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
    const token = localStorage.getItem("token");

    if (!token) {
        return (<Navigate to="/" replace state={{ message: "Necesitas loguearte para acceder a esta page"}} /> );
    }

    return children;
}

export default ProtectedRoutes;