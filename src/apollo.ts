import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { baseUrl } from "./util/apiUrls";

const link = createUploadLink({ uri: baseUrl });

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
