
export default function Home() {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="backdrop-blur-[20px] bg-white/30 p-8 rounded-2xl shadow-lg w-full max-w-2xl">
                <h1 className="text-3xl font-bold text-center mb-4">Bienvenido a la Plataforma</h1>
                <p className="text-center mb-4">Aquí puedes encontrar recursos y herramientas para tu aprendizaje.</p>
                <p className="text-center mb-4">Inicia sesión o regístrate para comenzar.</p>
            </div>
        </div>
    );
}