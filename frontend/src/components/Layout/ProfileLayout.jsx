import React from "react";

export const ProfileLayout = ({ children }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Perfil</h1>
      <div className="bg-white shadow-md rounded-2xl p-6">{children}</div>
    </div>
  );
};
