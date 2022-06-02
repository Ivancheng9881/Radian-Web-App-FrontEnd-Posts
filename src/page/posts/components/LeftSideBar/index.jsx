import { useState, useEffect } from "react";

import {
  HomeOutlined,
  DollarCircleOutlined,
  TeamOutlined,
  BookOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import groupEncryptUtils from "../../../../utils/encryption/groupKey";
import ipfsUtils from "../../../../utils/web3/ipfs/ipfs.utils";


// export interface FullProfile {
//   [key: string]: any;
//   firstName?: string
//   lastName?: string,
//   username?: string,
//   profilePictureCid?: string[],
//   nationality?: string,
//   location?: string,
//   religion?: string,
//   ethnicity?: string,
//   gender?: string,
//   interest?: string[],
//   nft?: IDisplayNft,
//   token?: string[],
//   application?: FixLater,
//   identityID?: string,
//   dataJson?: FixLater,
//   verificationJson?: FixLater,
//   linkedAddress?: ILinkedAddress[],
//   network?: string,
//   profileID?: string,
//   addresses?: IAddresses[],
//   externalAddresses?: IExternalAddress[],
// }

const LeftSideBar = () => {
  const [cipherKey, setCipherKey] = useState(null);
  const [cipherIv, setCipherIv] = useState(null);
  const [signedMessage, setSignedMessage] = useState(
    "0x6c4caac0dc069ab63d0001fb956b2848cc6a842864a0538fcfaf112befb2bf97546c46862d43632ef503bdbcb96f220088bfa7ace23b1cdd21ce6d858f7619db1b"
  );
  const [data] = 
    {
      username: "sdfasdfdsf",
      profilePicture: null,
      banner: null,
      description: null,
      profilePictureType: null,
    };


  useEffect(() => {
    if (data) {
      return ipfsUtils.uploadContent(data);
    }
  }, [data]);

  useEffect(() => {
    if (signedMessage !== null) {
      setCipherKey(groupEncryptUtils.generateCipherKey(signedMessage));
    }
  }, [signedMessage]);

  useEffect(() => {
    if (signedMessage !== null) {
      setCipherIv(groupEncryptUtils.generateCipherIv(signedMessage));
    }
  }, [signedMessage]);

  useEffect(() => {});
  return (
    <div className="rd-left-side-list-wrapper">
      <div className="rd-left-side-item">
        <p>{signedMessage}</p>
      </div>
      <div className="rd-left-side-item">
        <p>{cipherKey}</p>
      </div>
      <div className="rd-left-side-item">{cipherIv}</div>
      <div className="rd-left-side-item">
        <p>placeholder</p>
      </div>
      <div className="rd-left-side-item">
        <p>placeholder</p>
      </div>
    </div>
  );
};

export default LeftSideBar;
