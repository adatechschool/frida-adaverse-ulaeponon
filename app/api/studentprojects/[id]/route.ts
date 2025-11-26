import { db} from "@/app/lib/db";
import { studentProjectTable } from "@/app/lib/schema";
import { NextRequest } from "next/server";
import { eq} from 'drizzle-orm';

export async function DELETE(_req:NextRequest, res:RouteContext<"/api/studentprojects/[id]">){
    const {id} = await res.params;
    const deletedStudentProject = await db.delete(studentProjectTable).where(eq(studentProjectTable.id , Number(id)));
    return Response.json(deletedStudentProject);
};
export async function PUT(_req: NextRequest, res:RouteContext<"/api/studentprojects/[id]">){
    const {id} = await res.params; 
    const body = await _req.json();
    const {title,image, slug,lienGithub,lienDemo} = body;
    const updatedStudentProject = await db.update(studentProjectTable).set({
        title,
        image,
        slug,
        lienGithub,
        lienDemo
    }).where(eq(studentProjectTable.id , Number(id)));
    return Response.json (updatedStudentProject);
}