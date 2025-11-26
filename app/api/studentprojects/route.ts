import { db } from "@/app/lib/db";
import{ studentProjectTable } from "@/app/lib/schema";

export async function GET(){
    const studentProjects = await db.select().from(studentProjectTable);
return Response.json(studentProjects);
}