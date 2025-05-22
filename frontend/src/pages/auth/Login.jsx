import LoginForm from '../../components/Auth/LoginForm';

export default function Login() {
    return (
        <div className="flex h-screen">
            {/* Sección izquierda */}
            <div className="w-1/2 bg-gray-100 hidden md:block"></div>

            {/* Sección derecha con el formulario */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-4">
                <LoginForm />
            </div>
        </div>
    );
}
