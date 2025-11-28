

export function groupedProject(projects){
const group = {};

projects.forEach((project)=>{
    const promo= project.promoName;
    const projectName= project.projectName;

    if(!group[promo]) group[promo]= {};
    if(!group[promo][projectName]) group[promo][projectName]= [];
    group[promo][projectName].push(project);

});
return group;   
}