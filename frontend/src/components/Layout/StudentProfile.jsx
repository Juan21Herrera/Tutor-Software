import React from "react";

export const StudentPorfile = ({ user }) => {
  return (
    <div>
      <p className="text-lg font-semibold">Nombre: {user.name}</p>
      <p className="text-sm text-gray-500 mb-4">Rol: Estudiante</p>

      <div className="space-y-2">
        <button className="w-full bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700">
          Mis clases inscritas
        </button>
        <button className="w-full bg-teal-600 text-white rounded-lg py-2 hover:bg-teal-700">
          Ver progreso
        </button>
      </div>
    </div>
  );
};
