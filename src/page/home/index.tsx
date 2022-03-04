import React, { FC, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getProfileListCountErc, getProfileListErc } from "../../utils/web3/contract/profileContract/erc";
import { getProfileListCountSolana, getProfileListSolana } from "../../utils/web3/contract/profileContract/solana";
import PersonalProfile from './components/PersonalProfile.components';
import ProfileFrame from './components/ProfileFrame.component';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection } from '@solana/web3.js';
import { Provider } from '@project-serum/anchor';
import { FixLater, PaginationType } from "../../schema/helper.interface";
import config from "../../commons/config";
import { Profile, ProfileList } from "../../utils/web3/contract/profileContract/index.interface";
import LoadingScreen from "../../components/LoadingScreen";
import CustomSider from "../../components/Layout/CustomSider.components";
import CustomContent from "../../components/Layout/CustomContent.components";

const HomePage: FC = (props) => {

    // for fetching data on chain
    const solana_rpc_api = config.web3.network.solana.rpc
    const wallet = useWallet();
    
    const [ profileList, setProfileList ] = useState<ProfileList>([]);
    const [ pagination, setPagination ] = useState<PaginationType>({
        count: 0,
        skip: 0,
        limit: 10,
    });

    useEffect(()=>{
        getProfileListCount();
    }, []);

    useEffect(() => {
        if (pagination.count > 0) {
            fetchProfiles()
        }
    }, [pagination]);

    const getProfileListCount = async () : Promise<void> => {
        let count = await getProfileListCountErc();
        setPagination({...pagination, count: count})
    };

    const fetchProfiles =  async () => {
        let promises = await Promise.all([
            await getProfilesERC(),
            await getProfilesSolana()
        ])
        let profiles: ProfileList = [...promises[0], ...promises[1]];
        setProfileList((prevState) => prevState.concat(profiles))
    }

    const getProfilesSolana = async () : Promise<ProfileList> => {
        // crearte connection for getting data from rpc api
        const connection = new Connection(solana_rpc_api, "processed");
        const provider = new Provider(connection, wallet, {commitment: "processed"});
        let countSolana = await getProfileListCountSolana(provider);
        let profiles = await getProfileListSolana(countSolana, provider);
        // setProfileList((prevState) => prevState.concat(profiles));
        return profiles
    }

    const getProfilesERC = async () : Promise<ProfileList> => {
        let { count, skip, limit } = pagination;
        let pageSize = skip;
        if (skip >= count) {
            // do nothing
            return
        } else if (skip + limit > count) {
            pageSize = count - skip;
        } else {
            pageSize = count;
        }
        const profiles = await getProfileListErc(skip, pageSize);
        return profiles
    };
    
    return (
        <Layout>
            <CustomSider>
                <PersonalProfile/>
            </CustomSider>
            <CustomContent>
                { 
                    profileList.length > 0
                    ? <div className={`flex flex-wrap`}>
                        {profileList?.map((p, v) => {
                            return <ProfileFrame key={v} profile={p} />
                        })}
                    </div>
                    : <div><LoadingScreen /></div>
                }
            </CustomContent>
        </Layout>
    )
};

export default HomePage;