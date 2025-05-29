import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/nav/Header";
import Footer from "../../components/nav/Footer";
import axios from "axios";

export default function Classes() {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:8000/classes")
            .then(res => {
                setClasses(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error al obtener las clases:", err);
                alert(err?.response?.data?.detail || "Error al cargar las clases");
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="text-center mt-10">Cargando clases...</p>

    return (
        <section>
            <Header />
            <div className="max-w-4xl mx-auto p-6 space-y-6">
                <h1 className="text-4xl font-bold text-center text-gray-800">Clases disponibles</h1>
                {classes.length === 0 ? (
                    <p className="text-center text-gray-500">No hay clases disponibles.</p>
                ) : (
                    classes.map(classItem => <ClassCard key={classItem.id} classItem={classItem} />)
                )}
            </div>
            <Footer />
        </section>
    );
}