"use client"
import Link from "next/link";
export default  function ProjectCard({project }){
    return(
        <Link
        href={`/${project.projectType}/${project.id}`}
        >
        <div>
            <span>{project.promoName}</span>
            <img src={project.image? project.image :"/default-thumbnail.png" } />
            <h2>{project.title}</h2>
            <p>
                Publié le : {new Date(project.publishedAt).toLocaleDateString()}
            </p>
        </div>
        </Link>
        
    )
}