import { loadEnvConfig } from '@next/env'
import type { CodegenConfig } from '@graphql-codegen/cli';

loadEnvConfig(process.cwd())

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.NEXT_PUBLIC_X_CLONE_API_ENDPOINT,
  documents: "**/*.{tsx,ts}",
  generates: {
    "gql/": {
      preset: "client",
      plugins: []
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
