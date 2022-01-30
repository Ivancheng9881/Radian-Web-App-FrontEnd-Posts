import React, { useEffect, useState, useContext } from "react";
import Layout from "../../components/Layout";
import { getProfileErc, getProfileListCountErc, getProfileListErc, getPersonalProfile } from "../../utils/web3/contract/profileContract/erc";
// import { getProfileSolana } from "../../utils/web3/contract/profileContract/solana";
// import GlobalSnackBarProvider from '../start/context/snackbar/snackbar.provider'
// import CreateSnackbarContext from '../start/context/snackbar/snackbar.context';
// import Web3Context from '../../utils/web3/context/web3.context';
import PersonalProfile from './components/PersonalProfile.components';
import ProfileFrame from './components/ProfileFrame.component';
import Web3Context from '../../utils/web3/context/web3.context';
import ERCUtils from "../../utils/web3/context/erc.utils";

export default function HomePage() {
    const Web3ContextProvider = useContext(Web3Context);
    const [ network, setNetwork ] = useState(undefined);
    const [ profileList, setProfileList ] = useState([]);
    const [ profile, setProfile ] = useState([]);
    const [ pagination, setPagination ] = useState({
        count: 0,
        skip: 0,
        limit: 10,
    });
    
    // useEffect(() => {
    //     getCurrentChainId();
    // },[window.ethereum.networkVersion, network])

    // useEffect(() => {
    //     Number(window.ethereum.networkVersion) === 137 && getProfileListCount();
    // }, [window.ethereum.networkVersion])

    // useEffect(() => {
    //     if(Number(window.ethereum.networkVersion) === 137 && pagination.count > 0){
    //     getProfiles();
    //     }
    // }, [window.ethereum.networkVersion, pagination]);

    // fetch profile only if there is address selected and the chainID is correct

    console.log("web3context");
    console.log(Web3ContextProvider);

    useEffect(() => {
        if (window.ethereum.selectedAddress != null){
            getCurrentChainId();
        }
    },[window.ethereum.networkVersion, network])

    const getCurrentChainId = async () => {
        const currentNetwork = await Web3ContextProvider.network
        setNetwork(currentNetwork) 
    }

    useEffect(() => {
        if (window.ethereum.selectedAddress != null){
            Number(window.ethereum.networkVersion) === 137 && fetchUserProfile();
            return () => setProfile([]);
        }
    }, [window.ethereum.networkVersion])

    useEffect(()=>{
        getProfileListCount();
    }, []);

    useEffect(()=>{
        getProfiles();
    }, [pagination]);

    const getProfileListCount = async () => {
        let count = await getProfileListCountErc();
        console.log('Pagination COUNT:', count)
        setPagination({...pagination, count: count})
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
        console.log(profiles);
        setProfileList(profiles);
        
        setPagination({
            ...pagination,
            skip: skip + pageSize   
        })
    };

    const fetchUserProfile = async () => {
        const userProfile  = await getPersonalProfile()
        console.log('HomePage: User profile updated', userProfile)
        if(userProfile != null || undefined ) setProfile(userProfile)
    }
    
    return (
        <Layout>
                 <div className='pt-32'>
                    <div className='inline-flex w-full'>
                        <div className='w-2/3 max-w-sm'>
                            <PersonalProfile pid={profile} />
                        </div>
                        <div className='w-2/3 inline-flex flex-wrap content-start'>
                            {
                                profileList?.map((p) => {
                                    return <ProfileFrame key={p} pid={p} />
                                })
                            }
                        </div>
                    </div>
                </div>
        </Layout>
    )
}