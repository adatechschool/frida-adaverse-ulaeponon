import {db} from "@/app/lib/db";
import { projectTable, promoTable, studentProjectTable } from "@/app/lib/schema";
import { eq } from "drizzle-orm";

export async function ProjectDetailsPage({params}){
 const{projectId} = await params;
  const projectData = await db.select(
    {
        project: projectTable,
        promo: promoTable,
        studentProject : studentProjectTable,
    }
  )
  .from(studentProjectTable)
  .leftJoin(projectTable, eq(studentProjectTable.id_project , projectTable.id))
  .leftJoin(promoTable, eq(promoTable.id, studentProjectTable.id_prom))
  .where(eq(studentProjectTable.id, Number(projectId)));

  if(projectData.length ===0){
    return <div>Projet non trouvé</div>
  }
  const {project, promo, studentProject} = projectData[0];

  return(
    <div>
        <div>
            <img src={studentProject?.image||"/default-thumbnail.png"}  />
        </div>
  <div>
    <h1>
            { studentProject?.title ||project?.projectName}
        </h1>
        <span>Promo : {promo?.promName ||"Aucune promo"}</span>
        <p>Publié le : {studentProject?.publishedAt ? new Date(studentProject.publishedAt).toLocaleDateString() : "Date inconnue"}</p>
        
        </div>
        
    </div>
)}