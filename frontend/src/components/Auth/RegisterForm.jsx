import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { BsMicrosoft } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);
  

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "role" && value === "Profesor") {
      setForm((prev) => ({ ...prev, group: "" }));
    }
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    if (form.password !== form.confirm_password) {
      setMessage({ type: "error", text: "Las contraseñas no coinciden." });
      return;
    }

    try {
      const response = await fetch("https://backend-tutor-software.onrender.com/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: "¡Registro exitoso! Redirigiendo...",
        });
        setTimeout(() => (window.location.href = "/"), 2000);
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

  const sectionVariants = {
    hidden: { opacity: 0, height: 0, overflow: "hidden" },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.5 } },
    
  };

  return (
    <div className="max-w-2xl mx-auto px-4 mt-6">
      <button
        onClick={() => navigate("/")}
        className="text-green-600 font-semibold hover:text-green-500 transition"
      >
        ← Regresar
      </button>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-20">
          Crear cuenta
        </h2>

        {/* Paso 1: Información personal */}
        <AnimatePresence>
          {step === 1 && (
            <motion.div
              key="step1"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={sectionVariants}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Nombres"
                  value={form.name}
                  onChange={handleChange}
                  className="border rounded border-gray-300 w-full p-2 bg-white/50 focus:ring-2 focus:ring-green-600 outline-none"
                />

                <input
                  type="text"
                  name="last_name"
                  placeholder="Apellidos"
                  value={form.last_name}
                  onChange={handleChange}
                  className="border rounded border-gray-300 w-full p-2 bg-white/50 focus:ring-2 focus:ring-green-600 outline-none"
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <select
                  name="type_document"
                  value={form.type_document}
                  onChange={handleChange}
                  className="border rounded border-gray-300 w-full p-2 bg-white/50 focus:ring-2 focus:ring-green-600 outline-none"
                >
                  <option value="">Tipo de documento</option>
                  <option value="C.C">C.C.</option>
                  <option value="T.I">T.I.</option>
                </select>
                <input
                  type="number"
                  name="document"
                  placeholder="Número de documento"
                  value={form.document}
                  onChange={handleChange}
                  className="border rounded border-gray-300 w-full p-2 bg-white/50 focus:ring-2 focus:ring-green-600 outline-none"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Paso 2: Rol e institución */}
        <AnimatePresence>
          {step === 2 && (
            <motion.div
              key="step2"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={sectionVariants}
              className="space-y-4"
            >
              {/* Selector de rol */}
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="border rounded border-gray-300 w-full p-2 bg-white/50 focus:ring-2 focus:ring-green-600 outline-none"
              >
                <option value="">Seleccionar Cargo</option>
                <option value="Estudiante">Estudiante</option>
                <option value="Profesor">Profesor</option>
              </select>

              {/* Selector de grupo (ocupa su lugar fijo siempre) */}
              <motion.div
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: form.role === "Estudiante" ? 1 : 0,
                  height: form.role === "Estudiante" ? "auto" : 0,
                }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <select
                  name="group"
                  value={form.group}
                  onChange={handleChange}
                  className="border rounded border-gray-300 w-full p-2 bg-white/50 focus:ring-2 focus:ring-green-600 outline-none"
                >
                  <option value="">Grupo</option>
                  <option value="S4A">S4A</option>
                  <option value="S4B">S4B</option>
                  <option value="S4C">S4C</option>
                  <option value="S4D">S4D</option>
                  <option value="S4E">S4E</option>
                </select>
              </motion.div>

              {/* Input correo electrónico, siempre en la misma posición */}
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={form.email}
                onChange={handleChange}
                className="border rounded border-gray-300 w-full p-2 bg-white/50 focus:ring-2 focus:ring-green-600 outline-none"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Paso 3: Contraseña */}
        <AnimatePresence>
          {step === 3 && (
            <motion.div
              key="step3"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={sectionVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* Campo de contraseña */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Contraseña"
                  value={form.password}
                  onChange={handleChange}
                  className="border rounded border-gray-300 w-full p-2 bg-white/50 focus:ring-2 focus:ring-green-600 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Campo de confirmar contraseña */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirm_password"
                  placeholder="Confirmar contraseña"
                  value={form.confirm_password}
                  onChange={handleChange}
                  className="border rounded border-gray-300 w-full p-2 bg-white/50 focus:ring-2 focus:ring-green-600 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botones de navegación */}
        <div className="flex justify-between pt-2">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="btn-secondary border border-gray-300 p-2 rounded-lg shadow-sm hover:bg-gray-100 transition"
            >
              Atrás
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="btn-primary ml-auto border border-gray-300 p-2 rounded-lg shadow-sm hover:bg-gray-100 transition"
            >
              Siguiente
            </button>
          ) : (
            <button type="submit" className="btn-primary ml-auto border border-gray-300 p-2 rounded-lg shadow-sm hover:bg-blue-100 transition">
              Registrarse
            </button>
          )}
        </div>

        {message && (
          <p
            className={`text-sm pt-2 ${
              message.type === "error" ? "text-red-500" : "text-green-600"
            }`}
          >
            {message.text}
          </p>
        )}
      </form>

      {/* Sección alternativa */}
      <aside className="text-sm text-gray-600 text-center mt-6">
        Ya tienes una cuenta?
        <a
          onClick={() => navigate("/login")}
          className="text-green-600 hover:text-green-500 font-semibold ml-1 cursor-pointer"
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
            className="text-green-600 hover:text-green-500 font-semibold"
          >
            Términos de servicio
          </a>{" "}
          y{" "}
          <a
            href="/privacy"
            className="text-green-600 hover:text-green-500 font-semibold"
          >
            Política de privacidad
          </a>
        </p>
      </aside>
    </div>
  );
}
