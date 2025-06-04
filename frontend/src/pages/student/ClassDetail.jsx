import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../../components/nav/Footer";
import Header from "../../components/nav/Header";

export default function ClassDetail() {
    const { id } = useParams();
    const [classData, setClassData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch(`http://localhost:8000/classes/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => setClassData(data))
            .catch(err => console.error("Error al cargar la clase:", err));
    }, [id]);

    if (!classData) return <p>Cargando...</p>;

    return (
        <div>

        <Header />
        <section className="min-h-screen bg-gray-100 p-8">
            <main className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-4xl font-bold text-blue-600 mb-4">{classData.title}</h1>
                <p className="text-gray-600 text-sm mb-4">
                    Creada el {new Date(classData.created_at).toLocaleDateString()} a las {new Date(classData.created_at).toLocaleTimeString()}
                </p>

                <div className="space-y-4">
                    <DetailItem label="Descripción" value={classData.description || "No hay descripción"} />
                    <DetailItem
                        label="Contenido URL"
                        value={
                            classData.content_url ? (
                                <a
                                    href={classData.content_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                    >
                                    Ver contenido
                                </a>
                            ) : (
                                "No disponible"
                            )
                        }
                    />
                    <DetailItem label="Ejercicios" value={classData.exercises || "No hay ejercicios"} />
                    <DetailItem label="Exámenes" value={classData.exams || "No hay exámenes"} />
                    <DetailItem label="Recomendaciones" value={classData.recommendations || "No hay recomendaciones"} />
                </div>
            </main>
        </section>
        <Footer />
    </div>
    );
}

const DetailItem = ({ label, value }) => (
    <div className="mb-4">
        <h2 className="text-lg font-semibold mb-1">{label}:</h2>
        <p className="text-gray-700">{value || "No disponible"}</p>
    </div>
);

const renderMixedList = (input) => {
    if (!input) return "No disponible";
    
    try {
        const items = JSON.parse(input);

        if (Array.isArray(items)) {
            return (
                <ul className="list-disc list-inside space-y-1">
                    {items.map((item, index) => (
                        <li key={index}>
                            {typeof item === "string" && item.startsWith("http") ? (
                                <a
                                    href={item}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    {item}
                                </a>
                            ) : (
                                item
                            )}
                        </li>
                    ))}
                </ul>
            );
        }

        return input;
    } catch {
        return input; // Si no es un JSON válido, retorna el input original
    }
}
