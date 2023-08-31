import { GraphQLClient } from "graphql-request";

import { getSdk } from "~/lib/__generated/sdk";
import { endpoint } from "codegen";

const graphQlClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN}`,
  },
});

export const client = getSdk(graphQlClient);

// const previewGraphQlClient = new GraphQLClient(endpoint, {
//   headers: {
//     Authorization: `Bearer ${process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN}`,
//   },
// });

// export const previewClient = getSdk(previewGraphQlClient);
