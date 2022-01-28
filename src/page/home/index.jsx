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

    const windowNetworkVersion = window.ethereum?.networkVersion

    useEffect(() => {
    if(window.ethereum !== undefined){
        getCurrentChainId()
    }
    },[windowNetworkVersion, network])

    useEffect(() => {
        if(window.ethereum !== undefined){
        Number(windowNetworkVersion) === 137 && getProfileListCount();
        }
    }, [windowNetworkVersion])

    useEffect(() => {
        if(window.ethereum !== undefined){
        if(Number(windowNetworkVersion) === 137 && pagination.count > 0){
        }
        getProfiles();
        }
    }, [windowNetworkVersion, pagination]);

    useEffect(() => {
        if(window.ethereum !== undefined){
        Number(window.ethereum.networkVersion) === 137 && fetchUserProfile();
        return () => setProfile([]);
        }
    }, [windowNetworkVersion])
    
    const getCurrentChainId = async () => {
    const currentNetwork = await Web3ContextProvider.network
    setNetwork(currentNetwork) 
    }

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
        setProfileList(profiles);

        setPagination({
            ...pagination,
            skip: skip + pageSize   
        })
    };

    const fetchUserProfile = async () => {
        const userProfile  = await getPersonalProfile()
        console.log('HomePage: User profile updated', userProfile)
        if(userProfile) setProfile(userProfile)
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