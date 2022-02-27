import React, { FC, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getProfileListCountErc, getProfileListErc } from "../../utils/web3/contract/profileContract/erc";
import { getProfileListCountSolana, getProfileListSolana } from "../../utils/web3/contract/profileContract/solana";
// import { getProfileSolana } from "../../utils/web3/contract/profileContract/solana";
// import GlobalSnackBarProvider from '../start/context/snackbar/snackbar.provider'
// import CreateSnackbarContext from '../start/context/snackbar/snackbar.context';
// import Web3Context from '../../utils/web3/context/web3.context';
import PersonalProfile from './components/PersonalProfile.components';
import ProfileFrame from './components/ProfileFrame.component';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection } from '@solana/web3.js';
import { Provider } from '@project-serum/anchor';
import { FixLater, PaginationType } from "../../schema/helper.interface";
import config from "../../commons/config";
import { Profile, ProfileList } from "../../utils/web3/contract/profileContract/index.interface";

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
        // setProfileList([]);
        // getProfilesSolana();
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
        // setProfileList([...profileList, ...profiles] );
        
        // setPagination({
        //     ...pagination,
        //     skip: skip + pageSize
        // })

        return profiles
    };
    
    return (
        <Layout>
            <div className='pt-32'>
                <div className={`max-w-sm md:fixed h-full`}>
                        <PersonalProfile/>
                </div>
                <div className={`flex flex-wrap ml-8 md:ml-0 md:justify-start md:pt-0 pl-0 md:pl-96`}>
                        {
                            profileList?.map((p, v) => {
                                return <ProfileFrame key={v} profile={p} />
                            })
                        }
                </div>
            </div>
        </Layout>
    )
};

export default HomePage;