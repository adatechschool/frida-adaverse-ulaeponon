import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { db } from "./lib/db";
import { projectTable, promoTable } from "./lib/schema";




export default async function RootLayout({ children,}: Readonly<{ children: React.ReactNode;}>) {
 const promos = await db.select().from(promoTable);
 const projects = await db.select().from(projectTable);
  return (
    <html lang="en">
      <body
        
      >
        <Navbar promos={promos} projects={projects}/>
        {children}
      </body>
    </html>
  );
}
