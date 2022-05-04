import { Layout, Typography } from "antd";
import { FC, useEffect, useState, useContext } from "react";
import DefaultFooter from "../../../components/Footer";
import LandingSection from "../../landing/components/Section.components";
import PassportNftAssets from "../../../components/Passport/nft";
import PassportTokenAssets from "../../../components/Passport/token/indx";
import { useLocation } from "react-router";
import { FullProfile } from "../../../schema/profile/profile.interface";
import ipfsUtils from "../../../utils/web3/ipfs/ipfs.utils";
import { getMappedAddresses } from "../../../utils/web3/contract/profileContract/erc";
import RadianPassportUser from "../../../components/Passport/user";
import { Web3ProviderType } from "../../../utils/web3/context/web3.interface";
import Web3Context from "../../../utils/web3/context/web3.context";
import { gql, useLazyQuery } from "@apollo/client";
import UserSession from "../../../utils/Sdk/Session";
import searchEngineClient from "../../../utils/web3/searchEngine";
import ProfileContext from "../../../utils/user/context/user.context";

interface LocationState {
  scrollTo?: string;
}

const PassportUserPage : FC = () => {
    const location = useLocation<LocationState>();
    const web3Context : Web3ProviderType = useContext(Web3Context);
    const userContext = useContext(ProfileContext)

    const [ profile, setProfile ] = useState<FullProfile>();
    const [ address, setAddress ] = useState<string>();
    const [ isFollowing, setIsFollowing ] = useState<boolean>(false);

    const fetchProfile = async (profileID: string, identityID: string) => {
        let _profile = await ipfsUtils.getContentJson(identityID);
        setProfile({
        ..._profile,
        identityID: identityID,
        profileID: profileID,
        });
        getAddressFromProfile(profileID);
    };

        const getAddressFromProfile = async (profileID: string) => {
            const addresses = await getMappedAddresses(parseInt(profileID));
            setAddress(addresses[0]);        
        }

    useEffect(() => {
        if (location.pathname) {
        let param = location.pathname.split("/");
        let profileID = param[3];
        let identityID = param[4];
        fetchProfile(profileID, identityID);
        }
    }, [location]);

    // handle shallow routing scroll restoration
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.state]);


    const FOLLOW_USER_MUTATION = gql`
        mutation FollowUserMutation ($address: String!, $unfollow: Boolean) {
            followUser(address: $address, unfollow: $unfollow) {
                following
                followedBy
                unfollowed
            }
        }
    `;

    const handleFollow = async () => {
        // get current signer
        const userSession = new UserSession();
        if (!userContext.authToken) {
            const token = await userSession.create();
            userContext.setAuthToken(token)
        }

        const variables = {
            address: address,
            unfollow: isFollowing,
        }
        const mutation = await searchEngineClient.mutate({
            mutation: FOLLOW_USER_MUTATION,
            variables: variables,
        });

        setIsFollowing(!mutation.data.followUser.unfollowed)
    }

    const IS_FOLLOWING_QUERY = gql`
        query IsFollowQuery ($address: String!, $user: String!) {
            isFollowing(address: $address, user: $user)
        }
    `

    const [ isFollowingQuery ] = useLazyQuery(IS_FOLLOWING_QUERY);

    const fetchFollowingStatus = async () => {
        const callback = await isFollowingQuery({
            variables: {
                address: address,
                user: web3Context.providers['metamask@erc'],
            }
        });
        setIsFollowing(callback.data.isFollowing);
    }

    useEffect(() => {
        if (address) {
            fetchFollowingStatus()
        }
    }, [address])

    return (
        <>
            <Layout.Content>
                <LandingSection />
                <div style={{zIndex: 1001, position: 'relative'}}>
                    <div className="rd-section" style={{paddingTop: 60}}>
                        <RadianPassportUser 
                            profile={profile} 
                            address={address} 
                            isFollowing={isFollowing} 
                            handleFollow={handleFollow}
                        />
                    </div>
                    { profile && <>
                    <div id='nft' className="rd-section rd-section-centered">
                        <Typography.Title level={3}>NFT assets</Typography.Title>
                        <PassportNftAssets data={profile.nft} />
                    </div>
                    <div id='token' className="rd-section rd-section-centered">
                        <Typography.Title level={3}>Token Assets</Typography.Title>
                        <PassportTokenAssets 
                            data={profile.token} 
                            address={address} 
                        />
                    </div>
                    </> }

          <DefaultFooter disableGutter />
        </div>
      </Layout.Content>
    </>
  );
};

export default PassportUserPage;
