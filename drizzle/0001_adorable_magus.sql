ALTER TABLE "student_projects" RENAME COLUMN "id_pom" TO "id_prom";--> statement-breakpoint
ALTER TABLE "student_projects" DROP CONSTRAINT "student_projects_id_pom_prom_id_fk";
--> statement-breakpoint
ALTER TABLE "student_projects" ADD CONSTRAINT "student_projects_id_prom_prom_id_fk" FOREIGN KEY ("id_prom") REFERENCES "public"."prom"("id") ON DELETE cascade ON UPDATE no action;