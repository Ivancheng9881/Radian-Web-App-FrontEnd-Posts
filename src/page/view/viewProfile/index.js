import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProfileFromIDSubgraph } from "../../../utils/web3/contract/profileContract/erc/index"; 
import { getFullProfileFromIDSolana } from "../../../utils/web3/contract/profileContract/solana/index"; 
import ipfsUtils from '../../../utils/web3/ipfs/ipfs.utils';
import ProfileContext from "../../../utils/profile/context/profile.context";

import { useWallet } from '@solana/wallet-adapter-react';
import { Connection } from '@solana/web3.js';
import { Provider } from '@project-serum/anchor';

import ViewIdentityInformation from "./viewIdentity";

export default function ViewProfilePage(props) {

    const [ network, setNetwork ] = useState(null);
    const [ pid, setPid ] = useState(null);
    const [ profile, setProfile ] = useState(null);

    const params = useParams();
    const myProfile = useContext(ProfileContext).profile; // load profile info from provider

    // for fetching data on chain
    const solana_rpc_api = "https://api.devnet.solana.com";
    const wallet = useWallet();

    useEffect(()=>{
 
        // setNetwork(params.netowrk);
        // setPid(params.pid);

        // get profile from network
        if (params.network.toUpperCase() === "ERC") {
            getProfileFromIDSubgraph(params.pid.toString()).then(
                (result)=>{
                    // get data from IPFS
                    ipfsUtils.getContentJson(result?.identityID).then((profile_result)=>{
                        profile_result.addresses = result?.addresses;
                        profile_result.externalAddresses = result?.externalAddresses;
                        setProfile(profile_result);
                    });
                });
        } else if (params.network.toUpperCase() === "Solana") {
            const connection = new Connection(solana_rpc_api, "processed");
            const provider = new Provider(connection, wallet, "processed");
            getFullProfileFromIDSolana(params.pid, provider).then((result)=>{
                // get data from IPFS
                ipfsUtils.getContentJson(result?.identityID).then((profile_result)=>{
                    // TODO separate addresses into address and external address
                    profile_result.addresses = result.addresses;
                    console.log("profile result sol",profile_result);
                    setProfile(profile_result);
                });
            });
        } else if (params.network === undefined && params.pid === undefined) {
            setProfile(myProfile);
        }

        console.log("View Profile", profile);
        // get external addresses list


    }, [params])

    console.log(profile);
    
    return <div className='pt-32'>
        {profile ? 
            
            <div id='RD-createProfileRoot' className="relative">
                <div
                    id='RD-createProfileBody'
                    className="h-full w-full pt-20 pb-64 pl-10 pr-10 bg-theme-bg-dark"
                >
                    <div className="relative m-auto w-4/5 select-none">
                        <ViewIdentityInformation profile={profile} isSelf={(params.network === undefined && params.pid === undefined)}/>
                    </div>
                </div>
            </div>
        :             
        <div className="text-lg text-center text-theme-white"> Loading ... </div>}
    </div>;
}