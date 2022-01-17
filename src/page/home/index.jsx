import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { createProfileRoute, startRoute } from "../../commons/route";
import RoundedButton from "../../components/Button/Rounded.components";
import Layout from "../../components/Layout";
import ERCUtils from "../../utils/web3/context/erc.utils";
import { getProfileErc, getProfileListCountErc, getProfileListErc } from "../../utils/web3/contract/profileContract/erc";
import { getProfileSolana } from "../../utils/web3/contract/profileContract/solana";
import ipfsUtils from "../../utils/web3/ipfs/ipfs.utils";



function ProfileFrame(props) {


    let defaultProfilePictureId = 'QmdxdBrd22pJdKZesdfYFwAkh9ZcRFCQ9SVKUVatSSY3Rh';
    const [ profile, setProfile ] = useState(null)

    useEffect(() => {
        fetchProfile();
    }, [props.pid]);

    const fetchProfile = async () => {
        let p = await ipfsUtils.getContentJson(props.pid);
        if (p.profilePictureCid == '' || p.profilePictureCid == undefined) {
            p.profilePictureCid = defaultProfilePictureId;
            console.log(p.profilePictureCid)
        }
        setProfile(p)
    };

    return (
        <div className=''>
            {
                profile && 
                <div className='p-2'>
                    <div
                        className={`h-40 w-80 rounded-lg relative`}
                        style={{
                            backgroundImage: `url(${ipfsUtils.getContentUrl(profile.profilePictureCid)})`,
                            backgroundPosition: 'center center',
                            backgroundSize: 'cover'
                        }}
                    >
                        <span className={`absolute bg-theme-bg-dark w-fit text-theme-white 
                        pt-1.5 pb-1.5 pl-3 pr-3 rounded-lg left-2 bottom-2 opacity-80`}>
                            <span className=''>
                                {`${profile.firstName} ${profile.lastName}`}
                            </span>
                        </span>
                    </div>
                </div>
            }

        </div>
    )
}

function PersonalProfile({
    pid
}) {

    const history = useHistory();
    const [ profile, setProfile ] = useState(null)

    useEffect(() => {
        if (pid.length > 0) {
            fetchProfile()
        }
    }, [pid]);

    const fetchProfile = async () => {
        console.log(pid)
        let p = await ipfsUtils.getContentJson(pid[0]);
        setProfile(p);
    };

    const createProfile = () => {
        history.push(startRoute)
    }

    return (
        <div className='p-2 pl-4 pr-4' style={{height: '60vh'}}>
            <div className='bg-theme-bg-light rounded-lg w-full h-full overflow-hidden'>
                <div
                    className={`w-full h-full relative`}
                    style={{
                        backgroundImage: `url(${ipfsUtils.getContentUrl(profile?.profilePictureCid)})`,
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover'
                    }}
                >
                    { 
                        profile ? 
                        <span className={`absolute w-fit text-theme-white 
                            pt-1.5 pb-1.5 pl-3 pr-3 rounded-lg left-2 bottom-2 opacity-80`}>
                            <div className='font-semibold text-3xl'>
                                {`${profile?.firstName} ${profile?.lastName}`}
                            </div>
                            <div className='font-normal text-sm'>
                                {`Height: ${profile?.height} ${profile?.heightUnit}`}
                            </div>
                            <div className='font-normal text-sm'>
                                {`Nationality: ${profile?.nationality}`}
                            </div>
                            <div className='font-normal text-sm'>
                                {`Current Location: ${profile?.location}`}
                            </div>
                        </span>
                        : <span className={`absolute w-full text-theme-white pt-1.5 pb-1.5 pl-3 pr-3 rounded-lg 
                        bottom-24 opacity-80 text-center`}>
                            <RoundedButton  onClick={createProfile}>
                                <span className='m-auto'>Create Profile Now</span>
                            </RoundedButton>
                        </span>

                    }
                </div>
            </div>
        </div>
    )
}


export default function HomePage() {

    const [ profileList, setProfileList ] = useState([]) 
    const [ profile, setProfile ] = useState([]);
    const [ pagination, setPagination ] = useState({
        count: 0,
        skip: 0,
        limit: 10,
    });

    useEffect(() => {
        getProfileListCount();
    }, [])

    useEffect(() => {
        if (pagination.count > 0) getProfiles();
    }, [pagination]);

    useEffect(() => {
        fetchPersonalProfile();
        return () => setProfile([]);
    }, [])

    const getProfileListCount = async () => {
        let count = await getProfileListCountErc();
        setPagination({...pagination, count: count})
        console.log(count.toString())
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

        console.log(skip, pageSize);
        let profiles = await getProfileListErc(skip, pageSize);
        
        setProfileList(profiles);
        setPagination({
            ...pagination,
            skip: skip + pageSize   
        })
    };

    const fetchPersonalProfile = async () => {
        let walletAddress = await ERCUtils.getAddress();
        if (walletAddress) {
            let resp = await getProfileErc(walletAddress);
            setProfile(resp)
        }
    };

    return (
        <Layout>
            <div className='pt-32'>
                <div className='inline-flex  w-full'>
                    <div className='w-1/3 max-w-sm'>
                        <PersonalProfile  pid={profile} />
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