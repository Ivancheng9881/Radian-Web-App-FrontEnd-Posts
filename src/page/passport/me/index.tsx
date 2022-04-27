import { Layout, Typography } from "antd";
import { FC, useContext, useEffect } from "react";
import DefaultFooter from "../../../components/Footer";
import RadianPassport from "../../../components/Passport";
import UserContext from "../../../utils/user/context/user.context";
import LandingSection from "../../landing/components/Section.components";
import PassportNftAssets from "../../../components/Passport/nft";
import PassportTokenAssets from "../../../components/Passport/token/indx";
import Web3Context from "../../../utils/web3/context/web3.context";
import { Web3ProviderType } from "../../../utils/web3/context/web3.interface";
import { useLocation } from "react-router";

interface LocationState {
    scrollTo?: string,
}

const PassportMePage : FC = () => {
    const { profile } = useContext(UserContext);
    const { providers }: Web3ProviderType = useContext(Web3Context);
    const location = useLocation<LocationState>();

    useEffect(() => {
        if (location.state?.scrollTo) {
            const el = document.getElementById(location.state.scrollTo);
            el.scrollIntoView({behavior: 'smooth'})
        }
    }, [location.state])

    return (
        <>
            <Layout.Content>
                <LandingSection />
                <div style={{zIndex: 1001, position: 'relative'}}>
                    <div className="rd-section" style={{marginTop: 80}}>
                        <RadianPassport profile={profile} />
                    </div>
                    <div id='nft' className="rd-section rd-section-centered">
                        <Typography.Title level={3}>NFT assets</Typography.Title>
                        <PassportNftAssets data={profile.nft} />
                    </div>
                    <div id='token' className="rd-section rd-section-centered">
                        <Typography.Title level={3}>Tokens Assets</Typography.Title>
                        <PassportTokenAssets 
                            data={profile.token} 
                            address={providers?.['metamask@erc']} 
                        />
                    </div>
                    <DefaultFooter disableGutter />
                </div>
            </Layout.Content>
        </>
    )
};

export default PassportMePage;