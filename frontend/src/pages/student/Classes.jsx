import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/nav/Header";
import Footer from "../../components/nav/Footer";

export default function Classes() {
    const navigate = useNavigate();
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        fetch("http://localhost:8000/classes/read", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
        .then(res => res.json())
        .then(data => setClasses(data))
        .catch(err => console.error("Error al cargar las clases:", err));
    }, [navigate]);

    return (
        <section>
        <Header />
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-bold text-blue-600 mb-6">Tus Clases</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Classes Map */}
                {classes.map((cls, index) => (
                    <div 
                        key={index}
                        className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
                    >
                        <h2 className="text-2xl font-semibold mb-2">{cls.name}</h2>
                        <p className="text-gray-600">{cls.description}</p>
                        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                            Ver clase
                        </button>
                    </div>
                ))}
            </div>
        </div>
        <Footer />
        </section>
    );
}
