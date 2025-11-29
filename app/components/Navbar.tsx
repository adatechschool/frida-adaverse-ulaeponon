"use client"
import Link from "next/link";
import { useState } from "react";

export default function Navbar({}){
 const  [projectOpen, setProjectOpen]= useState (false);
 const projectTypes = ["AdAction", "Quizz", "DataViz"];
    return(
        <header>
            <nav>
            <Link href="/" className="text-2xl font-bold">Adaverse</Link>
        
        <li>
              <button onClick={() =>setProjectOpen(!projectOpen)}>Projets</button>
       { projectOpen &&(
        <ul>
           {projectTypes.map((type) => (
              <li key={type}>
                <Link href={`/projects/${type}`}>{type}</Link>
              </li>
            ))}

        </ul>)}
</li>
        <Link href="#">Ajouter un projet</Link>
        </nav>
        </header>
        
    )
}