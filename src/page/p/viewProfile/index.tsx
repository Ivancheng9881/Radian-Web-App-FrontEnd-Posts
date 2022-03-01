import { useEffect, useState, useContext, FC } from "react";
import { useParams } from "react-router-dom";
import { getProfileFromIDSubgraph } from "../../../utils/web3/contract/profileContract/erc/index"; 
import { getFullProfileFromIDSolana } from "../../../utils/web3/contract/profileContract/solana/index"; 
import ipfsUtils from '../../../utils/web3/ipfs/ipfs.utils';
import ProfileContext from "../../../utils/profile/context/profile.context";
import ProfileContractUtils from "../../../utils/web3/contract/profileContract/utils";

import { useWallet } from '@solana/wallet-adapter-react';
import { Connection } from '@solana/web3.js';
import { Provider } from '@project-serum/anchor';
import ProfileCard from "../../../components/ProfileCard";

import ViewIdentityInformation from "./viewIdentity";
import config from "../../../commons/config";
import { Space, Spin } from "antd";
import LoadingScreen from "../../../components/LoadingScreen";
import Layout from "antd/lib/layout";
import DefaultLayout from "../../../components/Layout";
import CustomSider from "../../../components/Layout/CustomSider.components";
import Web3Context from "../../../utils/web3/context/web3.context";

interface PageParamsType {
    network?: string,
    pid?: string,
}

const ViewProfilePage : FC = (props) => {
    
    const params: PageParamsType = useParams();
    const web3Context = useContext(Web3Context);

    const [ profile, setProfile ] = useState(null);
    const [ isOwner, setIsOwner ] = useState(false);


    // for fetching data on chain
    const solana_rpc_api = config.web3.network.solana.rpc;
    const wallet = useWallet();

    useEffect( () => {
        getProfile();
    }, [params, web3Context]);


    const getProfile = async () => {
        const profile = await ProfileContractUtils.fetchProfiles(
            parseInt(params.pid),
            params.network,
            wallet
        );
        const addresses: string[] = profile.addresses.map((a) => a.address);
        const currentAddr: string = web3Context.providers[web3Context.providers.selected];
        setIsOwner(addresses.includes(currentAddr))
        setProfile(profile)
    }

    return (
        <Layout>
            <CustomSider>
                <ProfileCard.Full 
                    profile={profile} 
                    isOwner={isOwner}
                />
            </CustomSider>
            <Layout.Content>
            <div className='pt-32'>
                <div className={`max-w-sm md:fixed h-full`}>
                    

                </div>
                <div className={`flex flex-wrap ml-8 md:ml-0 md:justify-start md:pt-0 pl-0 md:pl-96`}>
                </div>
            </div>
            </Layout.Content>
        </Layout>
    )
};

export default ViewProfilePage;