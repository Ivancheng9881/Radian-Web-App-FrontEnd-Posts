import QueryString from "qs";


const getQuery = (qs) => {
    if (!qs || qs === '') return {};

    qs = qs.slice(1, qs.length);
    return QueryString.parse(qs);  
};

const buildQueryString = (query) => {
    return QueryString.stringify(query);
};

const setQuery = (history, query) => {
    const qs = buildQueryString(query);
    history.push({
        pathname: history.location.pathname,
        search: `?${qs}`
    });
}

export {
    getQuery,
    setQuery,
    buildQueryString
}