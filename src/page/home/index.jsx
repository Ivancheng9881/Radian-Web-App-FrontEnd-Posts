import React, { useEffect, useState } from "react";
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

export default function HomePage() {

    // for fetching data on chain
    const solana_rpc_api = "https://api.devnet.solana.com";
    const wallet = useWallet();
    
    const [ profileList, setProfileList ] = useState([]);
    const [ pagination, setPagination ] = useState({
        count: 0,
        skip: 0,
        limit: 10,
    });

    useEffect(()=>{
        setProfileList([]);
        getProfilesSolana();
        getProfileListCount();
    }, []);

    useEffect(()=>{
        getProfiles();
    }, [pagination]);

    const getProfileListCount = async () => {
        let count = await getProfileListCountErc();
        console.log('Pagination COUNT:', count);
        setPagination({...pagination, count: count})
    }

    const getProfilesSolana = async () => {
        // crearte connection for getting data from rpc api
        const connection = new Connection(solana_rpc_api, "processed");
        const provider = new Provider(connection, wallet, "processed");
        let countSolana = await getProfileListCountSolana(provider);
        let profiles = await getProfileListSolana(countSolana, provider);
        let profileListSol = [];
        console.log('Solana COUNT:', countSolana);
        console.log("Solana Data", profiles);
        profiles.map((k,v)=>{
            let idObj ={network: "Solana"};
            idObj.identityID = k.identityId;
            idObj.verifyID = k.verifyId;
            profileListSol.push(idObj);
        })
        console.log('solana profiles', profileListSol);
        setProfileList((prevState) => prevState.concat(profileListSol));
    }

    const getProfiles = async () => {
        let { count, skip, limit } = pagination;
        let pageSize = skip;
        if (skip >= count) {
            return
        } else if (skip + limit > count) {
            pageSize = count - skip;
        } else {
            pageSize = count;
        }
        let profiles = await getProfileListErc(skip, pageSize);
        console.log("ERC profiles", profiles);
        setProfileList((prevState) => profiles.concat(prevState));
        
        setPagination({
            ...pagination,
            skip: skip + pageSize
        })
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
}