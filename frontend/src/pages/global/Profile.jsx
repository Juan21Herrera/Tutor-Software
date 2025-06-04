import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/nav/Header';
import Footer from '../../components/nav/Footer';

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

        const response = await axios.get('https://backend-tutor-software.onrender.com/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error('Error al obtener el perfil:', error);
        alert(error?.response?.data?.detail || 'Error al cargar el perfil');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="text-center mt-8">Cargando perfil...</div>;
  if (!user) return <div className="text-center mt-8 text-red-500">No se pudo cargar el perfil. ¿Iniciaste sesión?</div>;

  const { profile, role, progress, comments, courses } = user;
  const roleLabel = user.role.toLowerCase() === 'admin' ? 'Profesor' : 'Estudiante';

  return (
    <section>
      <Header />
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Perfil de {roleLabel}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <p><strong>Nombre:</strong> {profile.name} {profile.last_name}</p>
        <p><strong>Correo:</strong> {profile.email}</p>
        <p><strong>Documento:</strong> {profile.type_document} {profile.document}</p>
        {roleLabel == 'Estudiante' && <p><strong>Grupo:</strong> {profile.group || 'No asignado'}</p>}
        <p><strong>Rol:</strong> {role}</p>
        <p><strong>Estado:</strong> {profile.status ? 'Activo' : 'Inactivo'}</p>
      </div>

      {roleLabel === 'Estudiante' && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Progreso del estudiante</h2>
          {progress ? (
            <>
              <p><strong>Puntuación:</strong> {progress}</p>
              <p><strong>Comentarios:</strong> {comments || 'Sin comentarios'}</p>
            </>
          ) : (
            <p>No hay progreso registrado.</p>
          )}
        </div>
      )}

      {roleLabel === 'Profesor' && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Cursos a cargo</h2>
          {courses?.length > 0 ? (
            <ul className='list-disc pl-6'>
              {courses.map((course) => (
                <li key={course.id}>{course.title} ({course.students.length} estudiantes)</li>
              ))}
            </ul>
          ) : (
            <p>No hay cursos asignados.</p>
          )}
        </div>
      )}
    </div>
    <Footer />
    </section>
  );
}

export default Profile;
