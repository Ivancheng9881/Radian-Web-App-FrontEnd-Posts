const { createApolloFetch } = require('apollo-fetch');

export async function fetchDataFromSubgraph(subgraphUrl, query, params=null) {
    const fetchSubgraph = createApolloFetch({uri: subgraphUrl});
    return params ? 
        await fetchSubgraph({query: query, variables: params}) :
        await fetchSubgraph({query: query});
}

