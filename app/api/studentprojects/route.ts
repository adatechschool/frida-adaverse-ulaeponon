import { db } from "@/app/lib/db";
import{ projectTable, promoTable, studentProjectTable } from "@/app/lib/schema";
import { NextRequest } from "next/server";
import { eq } from "drizzle-orm";
export async function GET(){
    const studentProjects = await db.select().from(studentProjectTable);
return Response.json(studentProjects);
}
export async function POST(req:NextRequest){
const body = await req.json();
const {title,image, slug,lienGithub,lienDemo, promo, projectName} = body;
const promoRow = await db.select().from(promoTable).where(eq(promoTable.promName, promo));
   if (promoRow.length ===0){ 
    return Response.json({error:"Promo not found"}, {status:404});
   }
   const id_prom = promoRow[0].id;

   const projectRow = await db.select().from(projectTable).where(eq(projectTable.projectName, projectName));
   if (projectRow.length ===0){ 
    return Response.json({error:"Project not found"}, {status:404});
   };
   const id_project = projectRow[0].id;

   const newStudentProject = await db.insert(studentProjectTable).values({
    title,
    image,
    slug,
    lienGithub,
    lienDemo,
    id_prom,
    id_project
   })
return Response.json(newStudentProject);}