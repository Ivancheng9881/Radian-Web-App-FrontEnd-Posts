import {
    ApolloClient,
    InMemoryCache,
  } from "@apollo/client";
import searchEngineConfig from "./config";

console.log(searchEngineConfig.graphqlRoot)

const searchEngineClient = new ApolloClient({
    uri: searchEngineConfig.graphqlRoot,
    cache: new InMemoryCache(),
});

export default searchEngineClient;