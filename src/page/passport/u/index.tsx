import { Layout, Typography } from "antd";
import { FC, useContext, useEffect, useState } from "react";
import DefaultFooter from "../../../components/Footer";
import RadianPassport from "../../../components/Passport";
import LandingSection from "../../landing/components/Section.components";
import PassportNftAssets from "../../../components/Passport/nft";
import PassportTokenAssets from "../../../components/Passport/token/indx";
import Web3Context from "../../../utils/web3/context/web3.context";
import { Web3ProviderType } from "../../../utils/web3/context/web3.interface";
import { useLocation } from "react-router";
import { FullProfile } from "../../../schema/profile/profile.interface";
import ipfsUtils from "../../../utils/web3/ipfs/ipfs.utils";
import { getMappedAddresses } from "../../../utils/web3/contract/profileContract/erc";

interface LocationState {
  scrollTo?: string;
}

const PassportUserPage: FC = () => {
  const location = useLocation<LocationState>();

  const [profile, setProfile] = useState<FullProfile>();
  const [address, setAddress] = useState<string>();

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
    console.log(addresses);
    setAddress(addresses[0]);
  };

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

  return (
    <>
      <Layout.Content>
        <LandingSection />

        <div style={{ zIndex: 1001, position: "relative" }}>
          <div className="rd-section" style={{ paddingTop: 60 }}>
            <RadianPassport profile={profile} />
          </div>
          {profile && (
            <>
              <div id="nft" className="rd-section rd-section-centered">
                <Typography.Title level={3}>NFT assets</Typography.Title>
                <PassportNftAssets data={profile.nft} />
              </div>
              <div id="token" className="rd-section rd-section-centered">
                <Typography.Title level={3}>Token Assets</Typography.Title>
                <PassportTokenAssets data={profile.token} address={address} />
              </div>
            </>
          )}

          <DefaultFooter disableGutter />
        </div>
      </Layout.Content>
    </>
  );
};

export default PassportUserPage;
