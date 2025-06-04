import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ClassDetail = () => {
  const { id } = useParams();
  const [classData, setClassData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/classes/${id}`)
      .then(res => res.json())
      .then(data => setClassData(data));
  }, [id]);

  if (!classData) return <p className="p-6">Cargando clase...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{classData.title}</h1>
      <p className="text-gray-600 mb-4">Creada el {new Date(classData.created_at).toLocaleString()}</p>
      <p className="mb-2"><strong>Descripción:</strong> {classData.description || "No hay descripción"}</p>
      <p className="mb-2"><strong>Contenido URL:</strong> {classData.content_url || "No disponible"}</p>
      <p className="mb-2"><strong>Ejercicios:</strong> {classData.exercises || "No hay ejercicios"}</p>
      <p className="mb-2"><strong>Exámenes:</strong> {classData.exams || "No hay exámenes"}</p>
      <p className="mb-2"><strong>Recomendaciones:</strong> {classData.recommendations || "No hay recomendaciones"}</p>
      <p className="mt-4 text-sm text-gray-500">Última actualización: {new Date(classData.updated_at).toLocaleString()}</p>
    </div>
  );
};

export default ClassDetail;
