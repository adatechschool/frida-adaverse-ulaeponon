import Carousel from "./components/Carousel";
import ProjectCard from "./components/ProjectCard";


export default async function Home() {
  const res = await fetch("http://localhost:3000/api/studentprojects");
  const projects = await res.json();
  const byType: any = {};
  projects.forEach((project: any) => {
    const type = project.projectName; 
    if (!byType[type]) {
      byType[type] = [];
    }
    byType[type].push(project);
  });

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {Object.keys(byType).map((type) => (
        <div key={type} className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{type}</h2>
          <Carousel>
            {byType[type].map((project: any) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </Carousel>
        </div>
      ))}
    </div>
  );
}