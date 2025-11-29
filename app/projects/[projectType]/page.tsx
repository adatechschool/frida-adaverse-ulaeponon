import ProjectCard from "@/app/components/ProjectCard";
import { db} from "@/app/lib/db";
import { projectTable, promoTable, studentProjectTable } from "@/app/lib/schema";

import { eq, sql } from "drizzle-orm";


export default async function ProjectTypePage({params}) {
     const {projectType} = await params;
     const decodedProjectType = decodeURIComponent(projectType);
     console.log("projectType brut:", projectType);
     console.log("projectType décodé:", decodedProjectType);
      const projects = await db
    .select({
      project: projectTable,
      studentProject: studentProjectTable,
      promo: promoTable,
    })
    .from(projectTable)
    .leftJoin(
      studentProjectTable,
      eq(studentProjectTable.id_project, projectTable.id)
    )
    .leftJoin(promoTable, eq(promoTable.id, studentProjectTable.id_prom))
    .where(sql`LOWER(${projectTable.projectName}) = ${decodedProjectType.toLowerCase()}`);

  console.log("Nombre de résultats:", projects.length);
     return(
<div>
    <h1 className="text-3xl font-bold mb-4">Projets  {projectType}</h1>
    {projects.length ===0  && <p>Aucun projet trouvé</p>}
    {projects.map((row) =>(
         <ProjectCard
          key={row.studentProject?.id ?? `project-${row.project.id}`}
          project={{
           title: row.studentProject?.title ?? row.project.projectName,
            promoName: row.promo?.promName ?? "Aucune promo",
            publishedAt: row.studentProject?.publishedAt ?? new Date().toISOString(),
            image: row.studentProject?.image ?? "/default-thumbnail.png",
          }}
        />
    ))}
</div>
     )
}