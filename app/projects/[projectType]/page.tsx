import Carousel from "@/app/components/Carousel";
import ProjectCard from "@/app/components/ProjectCard";
import { db} from "@/app/lib/db";
import { projectTable, promoTable, studentProjectTable } from "@/app/lib/schema";

import { eq, sql } from "drizzle-orm";


export default async function ProjectTypePage({params}: {params: Promise<{ projectType: string }>}) {
     const {projectType} = await params;
     const decodedProjectType = decodeURIComponent(projectType);
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
    console.log("Fetched projects for type", projects);
     return(
<div  className="p-8 bg-gray-50 min-h-screen">
    <h1 className="text-3xl font-bold mb-8">Projets  {projectType}</h1>
    {projects.length ===0  && <p className="text-gray-500">Aucun projet trouvé</p>}
    <Carousel>
      {projects.map((row) =>(
         
         <ProjectCard
          key={row.studentProject?.id ?? `project-${row.project.id}`}
          project={{
            id: row.studentProject?.id,        
            projectType: decodedProjectType,
           title: row.studentProject?.title ?? row.project.projectName,
            promoName: row.promo?.promName ?? "Aucune promo",
            publishedAt: row.studentProject?.publishedAt ?? new Date().toISOString(),
         image: row.studentProject?.image ?? "/default-thumbnail.png",
          }}
        />        
    ))}
    </Carousel>
    
</div>
     )
}