import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_users_roles" AS ENUM('admin', 'editor');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "users_roles" (
	"order" integer NOT NULL,
	"parent_id" integer NOT NULL,
	"value" "enum_users_roles",
	"id" serial PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "packaging" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombre" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "textil" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombre" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "color" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombre" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "supplier" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombre" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "ubication" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombre" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "items" (
	"id" serial PRIMARY KEY NOT NULL,
	"cod_interno" varchar,
	"peso" numeric,
	"partida" varchar,
	"precio" numeric,
	"resultado" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "items_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"packaging_id" integer,
	"textil_id" integer,
	"color_id" integer,
	"supplier_id" integer,
	"ubication_id" integer
);

ALTER TABLE "users" ADD COLUMN "nombre" varchar NOT NULL;
ALTER TABLE "users" ADD COLUMN "celular" varchar NOT NULL;
CREATE INDEX IF NOT EXISTS "order_idx" ON "users_roles" ("order");
CREATE INDEX IF NOT EXISTS "parent_idx" ON "users_roles" ("parent_id");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "packaging" ("created_at");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "textil" ("created_at");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "color" ("created_at");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "supplier" ("created_at");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "ubication" ("created_at");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "items" ("created_at");
CREATE INDEX IF NOT EXISTS "order_idx" ON "items_rels" ("order");
CREATE INDEX IF NOT EXISTS "parent_idx" ON "items_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "items_rels" ("path");
DO $$ BEGIN
 ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_id_users_id_fk" FOREIGN KEY ("parent_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "items_rels" ADD CONSTRAINT "items_rels_parent_id_items_id_fk" FOREIGN KEY ("parent_id") REFERENCES "items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "items_rels" ADD CONSTRAINT "items_rels_packaging_id_packaging_id_fk" FOREIGN KEY ("packaging_id") REFERENCES "packaging"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "items_rels" ADD CONSTRAINT "items_rels_textil_id_textil_id_fk" FOREIGN KEY ("textil_id") REFERENCES "textil"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "items_rels" ADD CONSTRAINT "items_rels_color_id_color_id_fk" FOREIGN KEY ("color_id") REFERENCES "color"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "items_rels" ADD CONSTRAINT "items_rels_supplier_id_supplier_id_fk" FOREIGN KEY ("supplier_id") REFERENCES "supplier"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "items_rels" ADD CONSTRAINT "items_rels_ubication_id_ubication_id_fk" FOREIGN KEY ("ubication_id") REFERENCES "ubication"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "users_roles";
DROP TABLE "packaging";
DROP TABLE "textil";
DROP TABLE "color";
DROP TABLE "supplier";
DROP TABLE "ubication";
DROP TABLE "items";
DROP TABLE "items_rels";
ALTER TABLE "users" DROP COLUMN IF EXISTS "nombre";
ALTER TABLE "users" DROP COLUMN IF EXISTS "celular";`);

};
