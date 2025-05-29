import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {
    const [user, setUser] = useState(null);
    const [progress, setProgress] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (!storedUser || !token) {
            navigate("/login");
        } else {
            setUser(storedUser);
            setEmail(storedUser.email);
            

            axios
                .get(`http://localhost:8000/progress/${storedUser.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })

                .then((res) => setProgress(res.data.progress))
                .catch((err) => console.error("Error al obtener progreso:", err));
        }
    }, []);

    const handleUpdate = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await axios.put(
                `http://localhost:8000/user/${user.id}`,
                { email, password },
                { headers: { Authorization: `Bearer ${token}`}}
            );
            alert("Perfil actualizado exitosamente");
            // Update local storage with new user data
            localStorage.setItem("user", JSON.stringify(res.data));
            setUser(res.data);
        } catch (err) {
            console.error("Error al actualizar el perfil:", err);
            alert("Error al actualizar el perfil");
        }
    };

    if (!user) return <p className="text-center mt-10">Cargando...</p>;

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg space-y-6">
            <h1 className='text-2xl font-bold'>Perfil de Usuario</h1>

            <div className='space-y-2 text-gray-700'>
                <p><strong>Nombre:</strong> {user.name} {user.last_name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Rol:</strong> {user.role == "admin" ? "Profesor" : "Estudiante"}</p>
                <p><strong>Cursos:</strong> {user.group || "No asignado"}</p>
            </div>

            <div className='mt-4'>
                <h2 className='font-semibold text-lg'>Progreso del Curso</h2>
                <div className='w-full bg-gray-200 rounded-full h-4'>
                    <div
                        className="bg-green-500 h-4 rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className='text-sm text-gray-600 mt-1'>{progress}% completado</p>
            </div>

            <div className='mt-6'>
                <h2 className='font-semibold text-lg'>Actualizar Información</h2>
                <div className='flex flex-col gap-4 mt-2'>
                    <input 
                        type="email"
                        placeholder='Nuevo correo'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border px-3 py-2 rounded"
                    />
                    <input 
                        type="password"
                        placeholder='Nueva contraseña'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border px-3 py-2 rounded"
                    />
                    <button
                        onClick={handleUpdate}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Actualizar Perfil
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Profile;