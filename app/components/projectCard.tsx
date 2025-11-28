"use client"
export default  function ProjectCard({project }){
    return(
        <div>
            <span>{project.promoName}</span>
            <img src= "/default-thumbnail.png" />
            <h2>{project.title}</h2>
            <p>
                Publié le : {new Date(project.publishedAt).toLocaleDateString()}
            </p>
        </div>
    )
}