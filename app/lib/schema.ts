import { date, integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";


export const promoTable = pgTable("prom",{
    id : serial("id").primaryKey(),
    promName: text('prom_name').notNull(),
    startedAt:date("started_at").notNull(),
});
 export const projectTable = pgTable("projects",{
    id: serial("id").primaryKey(),
    projectName : text("project_name").notNull(),
 });
 export const studentProjectTable = pgTable("student_projects",{
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    image : varchar("image",{length:255}).notNull(),
    slug : varchar("slug",{length:255}).notNull().unique(),
    lienGithub : varchar("lien_github",{length:255}).notNull(),
    lienDemo : varchar("lien_demo",{length:255}).notNull(),
    id_prom: integer("id_pom").notNull().references(()=>promoTable.id, {onDelete:"cascade"}),
    id_project: integer("id_project").notNull().references(()=>projectTable.id, {onDelete:"cascade"}),
    publishedAt:timestamp("published_at").defaultNow(),
 });