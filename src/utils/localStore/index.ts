import Key from "./key";

const setJson = (key: string, val: any) : void => {
    localStorage.setItem(key, JSON.stringify(val));
};

const getJson = (key: string) => {
    let val = localStorage.getItem(key);
    if (!val) return null;
    return JSON.parse(val);
}

const LocalStoreUtils = {
    Key,
    setJson,
    getJson,
};

export default LocalStoreUtils;