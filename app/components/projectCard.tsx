"use client";
import Link from "next/link";
export default  function ProjectCard({project }:{project:{
    id?:number,
    projectType:string,
    title:string,
    promoName:string,
    publishedAt:Date,
    image?:string,
}}){
 console.log("ProjectCard project:", project);
    return(
        <Link href={`/projects/${project.projectType}/${project.id}`}>

        <div className="w-80  flex-shrink-0 snap-start bg-white shadow-md rounded-lg p-4 hover:scale-105 transition-transform cursor-pointer">
            <span className="text-sm text-gray-500" >
                {project.promoName}</span>
                <div className="relative rounded-xl overflow-hidden">
                    <img src={project.image? project.image :"/default-thumbnail.png" } 
            className="w-full h-44 object-cover"/>
                </div>
            
            <h2 className="text-lg font-bold mt-2">{project.title}</h2>
            <p  className="text-sm text-gray-600">
                Publié le : {new Date(project.publishedAt).toLocaleDateString()}
            </p>
        </div>
        </Link>
        
    )
}