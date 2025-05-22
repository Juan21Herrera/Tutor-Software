import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { BsMicrosoft } from 'react-icons/bs';
import { motion } from "framer-motion";

export default function LoginForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/user/login',
                {
                    email: form.email,
                    password: form.password
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            localStorage.setItem("token", response.data.access_token);
            navigate("/");
        } catch (err) {
            setError("Invalid email or password");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="-mt-3"
        >
            <button
                className='cursor-pointer font-semibold text-green-600 hover:text-green-500 transition duration-300'
                onClick={() => navigate("/")}
            >
                Regresar
            </button>

            <form onSubmit={handleSubmit} className='space-y-4 p-4 max-w-sm mx-auto'>
                <h2 className='text-3xl -mt-4 text-green-600 font-bold text-center'>
                    Iniciar sesión
                </h2>

                <input
                    type="text"
                    name='email'
                    placeholder='Correo'
                    onChange={handleChange}
                    className='border rounded border-gray-300 w-full p-2 bg-white/50 focus:ring-2 focus:ring-green-600 outline-none'
                />
                <input
                    type="password"
                    name='password'
                    placeholder='Contraseña'
                    onChange={handleChange}
                    className='border rounded border-gray-300 w-full p-2 bg-white/50 focus:ring-2 focus:ring-green-600 outline-none'
                />
                <div className='mb-4 flex items-center'>
                    <input
                        id="login_remember"
                        type="checkbox"
                        name='remember'
                        className='mr-2 -mt-2 bg-[#C19A6B'
                    />
                    <label
                        htmlFor="login_remember"
                        className='text-sm text-gray-600 -mt-2 text-gray-700'
                    >
                        Recordarme
                    </label>
                </div>
                <button
                    className='w-full cursor-pointer bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-lg rounded transition duration-300'
                >
                    Entrar
                </button>
                {error && <p className='text-red-500'>{error}</p>}
            </form>

            <aside className='mt-4 text-sm text-gray-600'>
                <p className='flex justify-between -mt-5'>
                    <a
                        onClick={() => navigate("/forgot")}
                        className='text-green-600 ml-5 cursor-pointer hover:text-green-500 font-semibold ml-1 transition duration-300'
                    >
                        Olvidaste tu contraseña?
                    </a>
                    <p>
                        No tienes una cuenta?
                        <a
                            onClick={() => navigate("/register")}
                            className='cursor-pointer text-green-600 hover:text-green-500 font-semibold ml-1 transition duration-300'
                        >
                            Registrate
                        </a>
                    </p>
                </p>

                <div className='flex items-center my-3'>
                    <div className='flex-grow border-t border-black/30'></div>
                    <span className='mx-4 text-gray-500'>O</span>
                    <div className='flex-grow border-t border-black/30'></div>
                </div>

                <button className='flex cursor-pointer items-center bg-white justify-center w-full border border-gray-300 p-2 rounded-lg shadow-sm hover:bg-gray-100 transition'>
                    <BsMicrosoft size={24} className='mr-2 text-green-600' />
                    Ingresa con Microsoft 365
                </button>
                <p className='text-center text-gray-500 pt-5 transition duration-300'>
                    Al iniciar sesión, aceptas nuestros{" "}
                    <a
                        href="/terms"
                        className='text-green-600 hover:text-green-500 font-semibold ml-1 transition duration-300'
                    >
                        Términos de servicio
                    </a>{" "}
                    y{" "}
                    <a
                        href="/privacy"
                        className='text-green-600 hover:text-green-500 font-semibold ml-1 transition duration-300'
                    >
                        Política de privacidad
                    </a>
                    .
                </p>
            </aside>
        </motion.div>
    );
}
