
"use client";
import Link from "next/link";
import { useState } from "react";

export default function DemoButton({ lienDemo }: { lienDemo?: string }) {
  const [showModal, setShowModal] = useState(false);

  // Si le lien existe et n'est pas "#"
  if (lienDemo && lienDemo !== "#") {
    return (
      <Link
        href={lienDemo}
        target="_blank"
        className="flex items-center gap-3 px-8 py-4 bg-white text-black font-bold text-base border-2 border-white hover:bg-transparent hover:text-white transition-all"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
        </svg>
        VOIR LA DÉMO
      </Link>
    );
  }

  // Si pas de lien
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-3 px-8 py-4 bg-gray-600 text-white font-bold text-base border-2 border-gray-600 hover:bg-gray-700 transition-all"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
        </svg>
        VOIR LA DÉMO
      </button>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white text-black p-8 rounded-xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4">
              🚧 Projet pas encore hébergé
            </h3>
            <p className="text-gray-600 mb-6">
              Ce projet n'est pas encore disponible en ligne. Revenez bientôt !
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
}