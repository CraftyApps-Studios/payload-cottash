import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

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
  serverURL: 'https://payload-cottash.up.railway.app',
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  cors: ['https://cottash-front.vercel.app'],
  csrf: ['https://cottash-front.vercel.app'],
  collections: [
    Users,
    Packaging,
    Textil,
    Color,
    Supplier,
    Ubication,
    Items,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
})
