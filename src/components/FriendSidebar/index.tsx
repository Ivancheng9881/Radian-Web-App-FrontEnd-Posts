import { useQuery } from "@apollo/client";
import { FC, useEffect, useState } from "react";
import searchEngineQuery from "../../utils/web3/searchEngine/query";
import FriendAvatar from "./FriendAvatar.components";
import { IIdentity, IPagintion } from "./index.d";

import "./styles/index.less";

interface PageProps {
    
}

const FriendListSidebar : FC<PageProps> = () => {

    const { loading, error, data, refetch } = useQuery(
        searchEngineQuery.identity.IDENTITY_LIST
    );

    const [ identityList, setIdentityList ] = useState<IIdentity[]>();
    const [ pagination, setPagination ] = useState<IPagintion>();

    useEffect(() => {

        if (data) {
            setIdentityList(data.identityList.data);
            setPagination(data.identityList.meta)
        }
    }, [loading, data]);

    return (
        <div className="rd-fdSidebar-root">
            {
                identityList?.map((identity) => {
                    return <FriendAvatar 
                        key={identity.id} 
                        identity={identity} 
                    />
                })
            }
        </div>
    )
};

export default FriendListSidebar;