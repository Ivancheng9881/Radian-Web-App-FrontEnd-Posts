import config from "../../../commons/config";

const url = config.assets.searchEngine.uri;
// const url = 'http://127.0.0.1:8001';

const searchEngineConfig = {
    graphqlRoot: `${url}/graphql`
};

export default searchEngineConfig;