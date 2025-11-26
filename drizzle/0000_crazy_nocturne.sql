CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "prom" (
	"id" serial PRIMARY KEY NOT NULL,
	"prom_name" text NOT NULL,
	"started_at" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE "student_projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"image" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"lien_github" varchar(255) NOT NULL,
	"lien_demo" varchar(255) NOT NULL,
	"id_pom" integer NOT NULL,
	"id_project" integer NOT NULL,
	"published_at" timestamp DEFAULT now(),
	CONSTRAINT "student_projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "student_projects" ADD CONSTRAINT "student_projects_id_pom_prom_id_fk" FOREIGN KEY ("id_pom") REFERENCES "public"."prom"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_projects" ADD CONSTRAINT "student_projects_id_project_projects_id_fk" FOREIGN KEY ("id_project") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;