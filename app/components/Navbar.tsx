
"use client";
import Link from "next/link";
import { useState } from "react";
import Addproject from "./Addproject";

export default function Navbar() {
  const [projectOpen, setProjectOpen] = useState(false);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const projectTypes = ["AdAction", "Quizz", "DataViz"];

  return (
    <>
      <header className="bg-gray-900 text-white shadow-lg">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold hover:text-gray-300">
            adaVERSE
          </Link>

          {/* Menu */}
          <ul className="flex items-center gap-6">
            {/* Dropdown Projets */}
            <li className="relative">
              <button
                onClick={() => setProjectOpen(!projectOpen)}
                className="px-4 py-2 hover:text-gray-300 flex items-center gap-2"
              >
                TOUS LES PROJETS
                <svg
                  className={`w-4 h-4 transition-transform ${
                    projectOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {projectOpen && (
                <ul className="absolute top-full left-0 mt-2 bg-white text-gray-900 rounded-lg shadow-xl py-2 w-48 z-50">
                  {projectTypes.map((type) => (
                    <li key={type}>
                      <Link
                        href={`/projects/${type.toLowerCase()}`}
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setProjectOpen(false)}
                      >
                        {type}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Bouton Ajouter un projet */}
            <li>
              <button
                onClick={() => setShowAddProjectModal(true)}
                className="px-6 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600 transition"
              >
                SOUMETTRE UN PROJET
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Modal Ajouter un projet */}
      {showAddProjectModal && (
        <Addproject onClose={() => setShowAddProjectModal(false)} />
      )}
    </>
  );
}