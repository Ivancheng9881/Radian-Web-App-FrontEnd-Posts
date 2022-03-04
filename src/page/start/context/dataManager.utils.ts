

const mapData = (data: any, schema: any) => {
    let _data: any = {};
    Object.keys(schema).map((k: string, v: number) => {
        _data[k] = data[k]
    });
    return _data;
}

const ProfileDataManager = {
    mapData,
};

export default ProfileDataManager;