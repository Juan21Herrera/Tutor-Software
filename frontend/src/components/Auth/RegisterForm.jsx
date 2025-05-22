import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { BsMicrosoft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    type_document: "",
    document: "",
    group: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "rol" && value === "Profesor") {
      setForm((prev) => ({ ...prev, [name]: value, grupo: "" }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (
      !form.name ||
      !form.last_name ||
      !form.type_document ||
      !form.document ||
      !form.role ||
      !form.email ||
      !form.password ||
      !form.confirm_password 
    ) {
      setMessage({ type: "error", text: "Todos los campos son obligatorios." });
      return;
    }
    if (form.password !== form.confirmPassword) {
      setMessage({ type: "error", text: "Las contraseñas no coinciden." });
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          last_name: form.last_name,
          email: form.email,
          password: form.password,
          type_document: form.type_document,
          document: form.document,
          group: form.group,
          role: form.role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: "¡Registro exitoso! Redirigiendo...",
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setMessage({
          type: "error",
          text: data.message || "Fallo en el registro.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Error del servidor. Intenta más tarde.",
      });
    }
  };

  return (
    <div className=" -mt-3 px-4 ">
      <button
        onClick={() => navigate("/")}
        className="cursor-pointer text-green-600 font-semibold hover:text-green-500 transition duration-300"
      >
        Regresar
      </button>

      <form onSubmit={handleSubmit} className="p-6 space-y-5 ">
        <h2 className="text-3xl font-bold text-green-600 text-center">
          Crear cuenta
        </h2>

        {/* Inputs básicos en dos columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="nombres"
            placeholder="Nombres"
            value={form.nombres}
            onChange={handleChange}
            className="border rounded border-gray-300 w-full p-2 bg-white/50 focus:ring-2 focus:ring-green-600 outline-none"
          />

          <input
            type="text"
            name="apellidos"
            placeholder="Apellidos"
            value={form.apellidos}
            onChange={handleChange}
            className="border rounded border-gray-300 w-full p-2 bg-white/50 focus:ring-2 focus:ring-green-600 outline-none"
          />

          <div className="md:col-span-2 flex flex-col md:flex-row gap-4">
            <select
              name="tipoDocumento"
              value={form.tipoDocumento}
              onChange={handleChange}
              className="cursor-pointer border rounded border-gray-300 w-full md:w-1/3 p-2 bg-white/50 focus:ring-2 focus:ring-green-600 outline-none"
            >
              <option value="">Tipo de documento</option>
              <option value="C.C">C.C.</option>
              <option value="T.I">T.I.</option>
            </select>

            <input
              type="number"
              name="documento"
              placeholder="Número de documento"
              value={form.documento}
              onChange={handleChange}
              className="border rounded border-gray-300 w-full md:flex-1 p-2 bg-white/50 focus:ring-2 focus:ring-green-600 outline-none"
            />
          </div>

          <select
            name="cargo"
            value={form.cargo}
            onChange={handleChange}
            className="cursor-pointer border rounded border-gray-300 w-full p-2 bg-white/50 focus:ring-2 focus:ring-green-600 outline-none"
          >
            <option value="">Seleccionar Cargo</option>
            <option value="Estudiante">Estudiante</option>
            <option value="Profesor">Profesor</option>
          </select>

          {form.cargo === "Estudiante" && (
            <select
              name="grupo"
              value={form.grupo}
              onChange={handleChange}
              className="cursor-pointer border rounded border-gray-300 w-full p-2 bg-white/50 focus:ring-2 focus:ring-green-600 outline-none"
            >
              <option value="">Grupo</option>
              <option value="S4A">S4A</option>
              <option value="S4B">S4B</option>
              <option value="S4C">S4C</option>
              <option value="S4D">S4D</option>
              <option value="S4E">S4E</option>
            </select>
          )}

          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            value={form.correo}
            onChange={handleChange}
            className="border rounded border-gray-300 w-full p-2 bg-white/50 focus:ring-2 focus:ring-green-600 outline-none col-span-full"
          />
        </div>

        {/* Contraseñas en columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="contraseña"
              placeholder="Contraseña"
              value={form.contraseña}
              onChange={handleChange}
              className="border rounded border-gray-300 w-full p-2 bg-white/50 focus:ring-2 focus:ring-green-600 outline-none"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmarContraseña"
              placeholder="Confirmar contraseña"
              value={form.confirmarContraseña}
              onChange={handleChange}
              className="border rounded border-gray-300 w-full p-2 bg-white/50 focus:ring-2 focus:ring-green-600 outline-none"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="cursor-pointer w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Registrarse
        </button>

        {message && (
          <p
            className={`text-sm ${
              message.type === "error" ? "text-red-500" : "text-green-600"
            }`}
          >
            {message.text}
          </p>
        )}
      </form>

      {/* Aside */}
      <aside className="text-sm text-gray-600 text-center ">
        Ya tienes una cuenta?
        <a
          onClick={() => navigate("/login")}
          className="cursor-pointer text-green-600 hover:text-green-500 font-semibold ml-1 transition duration-300"
        >
          Inicia Sesión
        </a>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-black/30"></div>
          <span className="mx-4 text-gray-500">O</span>
          <div className="flex-grow border-t border-black/30"></div>
        </div>
        <button className="flex items-center bg-white justify-center w-full border border-gray-300 p-2 rounded-lg shadow-sm hover:bg-gray-100 transition">
          <BsMicrosoft size={24} className="mr-2 text-green-600" />
          Regístrate con Microsoft 365
        </button>
        <p className="text-gray-500 pt-4">
          Al registrarte aceptas nuestros{" "}
          <a
            href="/terms"
            className="text-green-600 hover:text-green-500 font-semibold transition duration-300"
          >
            Términos de servicio
          </a>{" "}
          y{" "}
          <a
            href="/privacy"
            className="text-green-600 hover:text-green-500 font-semibold transition duration-300"
          >
            Política de privacidad
          </a>
        </p>
      </aside>
    </div>
  );
}