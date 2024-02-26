import path from "path";

import { payloadCloud } from "@payloadcms/plugin-cloud";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";

import {
  Users,
  Color,
  Packaging,
  Supplier,
  Textil,
  Ubication,
  Items,
} from "./collections";

export default buildConfig({
  serverURL: process.env.SERVER_URL,
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  cors: [
    process.env.CORS_CSRF_FRONT_URL || "",
    process.env.SERVER_URL || "",
  ].filter(Boolean),
  csrf: [
    process.env.CORS_CSRF_FRONT_URL || "",
    process.env.SERVER_URL || "",
  ].filter(Boolean),
  collections: [Users, Packaging, Textil, Color, Supplier, Ubication, Items],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [payloadCloud()],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
});
