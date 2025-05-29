import { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simula obtener el token y hacer la petición al backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:8000/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error('Error al obtener el perfil:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="text-center mt-8">Cargando perfil...</div>;
  if (!user) return <div className="text-center mt-8 text-red-500">No se pudo cargar el perfil. ¿Iniciaste sesión?</div>;

  const roleLabel = user.role.toLowerCase() === 'admin' ? 'Profesor' : 'Estudiante';

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {/* <h1 className="text-2xl font-bold mb-4">Perfil de {roleLabel}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <p><strong>Nombre:</strong> {user.name} {user.last_name}</p>
        <p><strong>Correo:</strong> {user.email}</p>
        <p><strong>Documento:</strong> {user.type_document} {user.document}</p>
        <p><strong>Grupo:</strong> {user.group || 'No asignado'}</p>
        <p><strong>Rol:</strong> {user.role}</p>
        <p><strong>Estado:</strong> {user.status ? 'Activo' : 'Inactivo'}</p>
      </div> */}

      {roleLabel === 'estudiante' && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Progreso del estudiante</h2>
          {user.progress ? (
            <>
              <p><strong>Puntuación:</strong> {user.progress.score}</p>
              <p><strong>Comentarios:</strong> {user.progress.comment || 'Sin comentarios'}</p>
            </>
          ) : (
            <p>No hay progreso registrado.</p>
          )}
        </div>
      )}

      {roleLabel === 'profesor' && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Herramientas de profesor</h2>
          <ul className="list-disc pl-6">
            <li>Gestión de clases</li>
            <li>Visualización de progreso estudiantil</li>
            <li>Evaluaciones</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Profile;
