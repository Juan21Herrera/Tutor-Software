import { useNavigate } from "react-router-dom"



export default function Hero() {
    const Navigate = useNavigate()

    const handleClick = () => {
        const token = localStorage.getItem("token");
        if (token) {
            Navigate("/classes");
        } else {
            Navigate("/login");
        }
    }

    return (   

        <section className="relative h-screen w-full">
            {/* Background image */}
            <img 
                src="https://assets-global.website-files.com/5c51ea7c50968df9eb791d5b/6517132d591670099d80a18c_istockphoto-analisisdatos.jpeg" 
                alt="Data science" 
                className="absolute inset-0 w-full h-full object-cover blur-xs mask-b-from-75% mask-b-to-240%"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-4">
                <h1 className="text-6xl md:text-9xl font-bold">TUTOR</h1>
                <h2 className="text-4xl md:text-8xl font-bold">SOFTWARE</h2>
                <button 
                    onClick={handleClick}
                    className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition"
                >
                    Aprende data science
                </button>
            </div>

        </section>
    )

}