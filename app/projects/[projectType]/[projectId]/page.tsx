import DemoButton from "@/app/components/Demobutton";
import { db } from "@/app/lib/db";
import { projectTable, promoTable, studentProjectTable } from "@/app/lib/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

export default async function ProjectDetailsPage({
  params
}: {
  params: Promise<{
    projectId: string;
    projectType: string;
  }>;
}) {
  const { projectId, projectType } = await params;

  const projectData = await db
    .select({
      project: projectTable,
      promo: promoTable,
      studentProject: studentProjectTable,
    })
    .from(studentProjectTable)
    .leftJoin(projectTable, eq(studentProjectTable.id_project, projectTable.id))
    .leftJoin(promoTable, eq(promoTable.id, studentProjectTable.id_prom))
    .where(eq(studentProjectTable.id, Number(projectId)));

  if (projectData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-2xl">Projet non trouvé</p>
      </div>
    );
  }

  const { project, promo, studentProject } = projectData[0];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="relative bg-gray-800 pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-7xl font-bold mb-6">
            {studentProject?.title || project?.projectName}
          </h1>
          <div className="flex items-center justify-center gap-4 text-lg mb-10">
            <span>
              Le{" "}
              {studentProject?.publishedAt
                ? new Date(studentProject.publishedAt).toLocaleDateString("fr-FR", {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })
                : "Date inconnue"}
            </span>
            <span>·</span>
            <span>{project?.projectName || "Ada Quiz"}</span>
            <span className="px-4 py-2 bg-white text-black font-bold uppercase text-sm">
              {promo?.promName || "FRIDA"}
            </span>
          </div>

          {/* Boutons */}
          <div className="flex gap-4 justify-center">
  
            <DemoButton lienDemo={studentProject?.lienDemo} />
            {studentProject?.lienGithub && (
              <Link
                href={studentProject.lienGithub}
                target="_blank"
                className="flex items-center gap-3 px-8 py-4 border-2 border-red-500 text-red-500 font-bold text-base hover:bg-red-500 hover:text-white transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
                  <path d="M8 12h8v2H8v-2zm0 4h8v2H8v-2zm0-8h5v2H8V8z"/>
                </svg>
                VOIR LE CODE
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <img
            src={studentProject?.image || "/default-thumbnail.png"}
            alt={studentProject?.title || "Project"}
            className="w-full rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}