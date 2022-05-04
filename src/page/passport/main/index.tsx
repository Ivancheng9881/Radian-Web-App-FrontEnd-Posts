import { Button, Layout, Typography } from "antd";
import { FC, useContext, useEffect, useState } from "react";
import DefaultFooter from "../../../components/Footer";
import FriendCardCarousel from "../../../components/FriendCard/Carousel";
import RadianPassport from "../../../components/Passport";
import UserContext from "../../../utils/user/context/user.context";
import {
  getProfileListErc,
  getProfileListCountErc,
} from "../../../utils/web3/contract/profileContract/erc";
import { ProfileList } from "../../../utils/web3/contract/profileContract/index.interface";
import LandingSection from "../../landing/components/Section.components";
import { PaginationType } from "../../../schema/helper.interface";
import ipfsUtils from "../../../utils/web3/ipfs/ipfs.utils";
import { FullProfile } from "../../../schema/profile/profile.interface";
import ScrollIndicator from "../../../components/ScrollIndicator";

const PassportOverviewPage: FC = () => {
  const userContext = useContext(UserContext);

  const [pagination, setPagination] = useState<PaginationType>({
    count: 0,
    skip: 0,
    limit: 10,
  });
  const [profileList, setProfileList] = useState<FullProfile[]>([]);
  const [atTop, setAtTop] = useState<boolean>(true);

  const resolveProfileFromIpfs = async (profiles: ProfileList) => {
    const data = await Promise.all(
      profiles.map(async (p) => {
        let fullProfile = await ipfsUtils.getContentJson(p.identityID);
        return {
          ...fullProfile,
          identityID: p.identityID,
          profileID: p.profileID,
        };
      })
    );

    return data;
  };

  const getProfilesERC = async (): Promise<ProfileList> => {
    let { count, skip, limit } = pagination;
    let pageSize = skip;
    if (skip >= count) {
      // do nothing
      return;
    } else if (skip + limit > count) {
      pageSize = count - skip;
    } else {
      pageSize = count;
    }
    const profiles = await getProfileListErc(skip, pageSize);
    return profiles;
  };

  const getProfile = async () => {
    try {
      const ercData = await getProfilesERC();
      if (ercData.length > 0) {
        const profileData = await resolveProfileFromIpfs(ercData);
        setProfileList(profileData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProfileListCount = async (): Promise<void> => {
    let count = await getProfileListCountErc();
    setPagination({ ...pagination, count: count });
  };

  const handleScroll = () => {
    const offsetTop =
      document.body.scrollTop || document.documentElement.scrollTop;
    setAtTop(offsetTop <= 50);
  };

  useEffect(() => {
    getProfileListCount();
  }, []);

  useEffect(() => {
    if (pagination.count > 0) {
      getProfile();
    }
  }, [pagination]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Layout.Content>
        <LandingSection />
        <div style={{ zIndex: 1001, position: "relative" }}>
          <div className="rd-section" style={{ paddingTop: 60 }}>
            <RadianPassport profile={userContext.profile} clickable />
          </div>
          <div className="rd-section" style={{ textAlign: "center" }}>
            <Typography.Title level={4} className="rd-typo-marginless">
              Welcome
            </Typography.Title>
            <Typography.Title level={1} className="rd-typo-marginless">
              RADIAN PASSPORT
            </Typography.Title>
            <div
              className="rd-typo-bounding"
              style={{ width: 800, margin: "auto" }}
            >
              <Typography.Text className="rd-typo-desc">
                RADIAN Passport is a Decentralised Identity that allows users to
                bind wallet address(es) from multiple blockchains to a single
                identity so that your on-chain presence can be aggregated. The
                passport allows others to know who they are interacting with in
                dApps.
              </Typography.Text>
            </div>
            <br />
            <Button type="primary" size="large" shape="round">
              Social Now
            </Button>
          </div>
          <div className="rd-section" style={{ textAlign: "center" }}>
            <Typography.Title level={4} className="rd-typo-marginless">
              Join the
            </Typography.Title>
            <Typography.Title level={1} className="rd-typo-marginless">
              Social Community
            </Typography.Title>
            <div
              className="rd-typo-bounding"
              style={{ width: 800, margin: "auto" }}
            >
              <Typography.Text className="rd-typo-desc">
                Start Web3 style of social by clicking into the profile! You now
                have the freedom of speech, the ownership of your identity,
                relationships and content.
              </Typography.Text>
            </div>
            <br />
            {/* <Button type="primary" size="large" shape="round" >Find friends</Button> */}
            <div style={{ marginTop: 15 }}>
              {profileList.length > 0 && (
                <FriendCardCarousel profiles={profileList} />
              )}
            </div>
          </div>
          <DefaultFooter disableGutter={true} />
          <ScrollIndicator hidden={!atTop} />
        </div>
      </Layout.Content>
    </>
  );
};

export default PassportOverviewPage;
