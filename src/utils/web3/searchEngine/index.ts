import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
  } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import searchEngineConfig from "./config";

const httpLink = createHttpLink({
    uri: searchEngineConfig.graphqlRoot
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('radian:auth:jwt');

    return {
        headers: {
        ...headers,
        authorization: token ? `jwt ${token}` : '',
        }
    }
})

const searchEngineClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});
export default searchEngineClient;