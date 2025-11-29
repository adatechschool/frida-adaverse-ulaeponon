import ProjectCard from "./components/ProjectCard";
import { groupedProject } from "./lib/groupProject";


export default async function Home() {
  const res= await fetch('http://localhost:3000/api/studentprojects');
  const projects= await res.json();
  const grouped= groupedProject(projects);
 return (
  <div className="p-6 space-y-10">
    {Object.entries(grouped).map(([promoName, projectsByName]) => (
      <div key={promoName}>
         <h2 className="text-3xl font-bold mb-4">{promoName}</h2>
        {Object.entries(projectsByName).map(([projectName, projectList]) => (
          <div key={projectName} className="mb-6">
            <h3 className="text-xl font-semibold mb-2">{projectName}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {projectList.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
)};
