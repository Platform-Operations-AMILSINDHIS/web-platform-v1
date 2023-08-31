import type { CodegenConfig } from "@graphql-codegen/cli";

const productionEndpoint = "https://graphql.contentful.com/content/v1/spaces";
// const contentfulSpaceId = "f0p9zov000x1";

const endpointOverride = process.env.CONTENTFUL_GRAPHQL_ENDPOINT;
export const endpoint = `${endpointOverride ?? productionEndpoint}/${
  process.env.CONTENTFUL_SPACE_ID
}`;
export const config: CodegenConfig = {
  overwrite: true,
  ignoreNoDocuments: true,
  schema: [
    {
      [endpoint || ""]: {
        headers: {
          Authorization: `Bearer ${process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN}`,
        },
      },
    },
  ],
  generates: {
    "src/lib/__generated/graphql.schema.json": {
      plugins: ["introspection"],
    },
    "src/lib/__generated/graphql.schema.graphql": {
      plugins: ["schema-ast"],
    },
    "src/lib/__generated/sdk.ts": {
      documents: ["src/lib/graphql/**/*.graphql"],
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
      config: {
        rawRequest: false,
        inlineFragmentTypes: "combine",
        skipTypename: false,
        exportFragmentSpreadSubTypes: true,
        dedupeFragments: true,
        preResolveTypes: true,
      },
    },
  },
};

export default config;
