import React from "react";

export const ProfessorPorfile = ({ user }) => {
  return (
    <div>
      <p className="text-lg font-semibold">Nombre: {user.name}</p>
      <p className="text-sm text-gray-500 mb-4">Rol: Profesor</p>

      <div className="space-y-2">
        <button className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700">
          Ver clases creadas
        </button>
        <button className="w-full bg-green-600 text-white rounded-lg py-2 hover:bg-green-700">
          Crear nueva clase
        </button>
      </div>
    </div>
  );
};
