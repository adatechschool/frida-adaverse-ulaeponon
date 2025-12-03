"use client";
import { useState, useEffect } from "react";

interface AddprojectProps {
  onClose: () => void;
}

export default function Addproject({ onClose }: AddprojectProps) {
  const [formData, setFormData] = useState({
    title: "",
    lienGithub: "",
    lienDemo: "",
    id_prom: "",
    id_project: "",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [promos, setPromos] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Charger les promos et projets Ada
  useEffect(() => {
    async function loadData() {
      try {
        const [promosRes, projectsRes] = await Promise.all([
          fetch("/api/promos"),
          fetch("/api/projects"),
        ]);
        const promosData = await promosRes.json();
        const projectsData = await projectsRes.json();
        setPromos(promosData);
        setProjects(projectsData);
      } catch (error) {
        console.error("Erreur chargement données:", error);
      }
    }
    loadData();
  }, []);

  // Validation du formulaire
  const validateForm = () => {
    const newErrors: string[] = [];

    if (!formData.title.trim()) {
      newErrors.push("Le titre du projet est obligatoire");
    }

    if (!formData.lienGithub.trim()) {
      newErrors.push("Le lien GitHub est obligatoire");
    }

    if (!formData.lienDemo.trim()) {
      newErrors.push("Le lien de démo est obligatoire");
    }

    if (!formData.id_prom) {
      newErrors.push("La promotion est obligatoire");
    }

    if (!formData.id_project) {
      newErrors.push("Le projet Ada est obligatoire");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  // Soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors([]);

    try {
      const response = await fetch("/api/studentprojects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          lienGithub: formData.lienGithub,
          lienDemo: formData.lienDemo,
          id_prom: parseInt(formData.id_prom),
          id_project: parseInt(formData.id_project),
          publishedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création du projet");
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
        window.location.reload(); // Recharger pour voir le nouveau projet
      }, 2000);
    } catch (error) {
      setErrors(["Une erreur est survenue. Veuillez réessayer."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            Proposer un projet
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Messages d'erreur */}
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="font-semibold text-red-800 mb-2">
                 Erreurs à corriger :
              </p>
              <ul className="list-disc list-inside space-y-1">
                {errors.map((error, index) => (
                  <li key={index} className="text-red-700">
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Message de succès */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-semibold">
                ✅ Projet créé avec succès !
              </p>
            </div>
          )}

          {/* Titre du projet */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Titre du projet *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Ex: Mon super projet Ada"
            />
          </div>

          {/* Lien GitHub */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Lien GitHub *
            </label>
            <input
              type="url"
              value={formData.lienGithub}
              onChange={(e) =>
                setFormData({ ...formData, lienGithub: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="https://github.com/username/project"
            />
          </div>

          {/* Lien Démo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Lien de la démo *
            </label>
            <input
              type="url"
              value={formData.lienDemo}
              onChange={(e) =>
                setFormData({ ...formData, lienDemo: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="https://mon-projet.vercel.app"
            />
            <p className="text-sm text-gray-500 mt-1">
              Si pas encore hébergé, mettez "#"
            </p>
          </div>

          {/* Promotion */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Promotion *
            </label>
            <select
              value={formData.id_prom}
              onChange={(e) =>
                setFormData({ ...formData, id_prom: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">Sélectionnez une promotion</option>
              {promos.map((promo) => (
                <option key={promo.id} value={promo.id}>
                  {promo.promName}
                </option>
              ))}
            </select>
          </div>

          {/* Projet Ada */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Projet Ada *
            </label>
            <select
              value={formData.id_project}
              onChange={(e) =>
                setFormData({ ...formData, id_project: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">Sélectionnez un projet</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.projectName}
                </option>
              ))}
            </select>
          </div>

          {/* Boutons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Création..." : "Créer le projet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}