import RegisterForm from '../../components/Auth/RegisterForm';

export default function Register() {
    return (
        <div className="flex h-screen">
            {/* Sección con el formulario a la izquierda */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-4">
                <RegisterForm />
            </div>

            {/* Sección visual gris a la derecha */}
            <div className="w-1/2 bg-gray-100 hidden md:block"></div>
        </div>
    );
}
