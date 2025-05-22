import { Bars3Icon } from "@heroicons/react/24/outline";
import {LogOut, Settings, User,Circle} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Header() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserName(decodedToken.name);
            } catch (error) {
                console.error("Error decoding token:", error);
                setUserName("Estudiante")
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

  return (

    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
        
        <div>
             <h1 onClick={() => navigate("/")} className="text-xl font-bold cursor-pointer">Tutor Software</h1>
        </div>
        

        <div className="flex items-center gap-6">

        <span
            onClick={() => {
                const token = localStorage.getItem("token");
                navigate(token ? "/classes" : "/login");
            }}
            className="hover:underline cursor-pointer"
        >
            Clases
        </span>

        <span
            onClick={() => {
                const token = localStorage.getItem("token");
                navigate(token ? "/exercises" : "/login");
            }}
            className="hover:underline cursor-pointer"
        >
            Ejercicios
        </span>

        {userName ? (
            <div className="relative">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex items-center space-x-2"
                >
                    <Circle className="w-7 h-7" />
                    <span>{userName}</span>

                </button>

                {menuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#0099ff] text-black rounded-lg shadow-lg z-10">
                        <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={() => navigate("/profile")}
                        >
                            Perfil
                        </button>
                        <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={handleLogout}
                        >
                            Cerrar sesión
                        </button>
                    </div>
                    )}
            </div>
        ) : (
            <>
                <a href="/login" className="hover:underline">
                    Sign In
                </a>
                <a href="/register" className="hover:underline mr-4">
                    Sign Up
                </a>
            </>
        )}
        </div>
    </nav>
    
  );
}
