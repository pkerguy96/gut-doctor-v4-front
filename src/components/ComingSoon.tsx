import React from "react";

const ComingSoon = () => {
  return (
    <div className="p-0 flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 via-teal-100 to-green-200">
      <div className="text-center max-w-xl bg-white p-8 rounded-lg shadow-lg">
        <img
          src="/logo-cropped.jpg" // Remplacez par le chemin de votre logo
          alt="Logo du cabinet médical"
          className="w-24 mx-auto mb-6"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Bientôt Disponible
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Cette page sera bientôt disponible
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => (window.location.href = "/Dashboard")}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Retour à l'accueil
          </button>
        </div>
        <footer className="text-gray-500 text-sm mt-8">
          © {new Date().getFullYear()} Tous droits réservés.
        </footer>
      </div>
    </div>
  );
};

export default ComingSoon;
