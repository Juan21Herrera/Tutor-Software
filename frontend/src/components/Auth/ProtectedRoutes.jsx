import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoutes = ({ children, role }) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) {
        return <Navigate to="/login"/>;
    }

    if (role && user.role.toLowerCase() !== role.toLowerCase()) {
        return <Navigate to="/"/>;
    }

    return children;

};

export default ProtectedRoutes;