import { Col, Image, Row, Space, Typography } from "antd";
import { FC, useEffect, useRef, useState } from "react"
import config from "../../commons/config";
import { FullProfile } from "../../schema/profile/profile.interface";
import ipfsUtils from "../../utils/web3/ipfs/ipfs.utils";

interface PageProps {
    profile: FullProfile,
}

const RadianPassport: FC<PageProps> = ({profile}) => {

    return (
        <div className="rd-passport-root">
            <div className="rd-passport-body">
                <Row >
                    <Col lg={6} >
                        <Space direction="vertical" >
                            <Image src={`${config.assets.cdn}/logo/logo_black.png`} />
                            <div className="rd-passport-avatar">
                                <img src={`${ipfsUtils.getContentUrl(profile.profilePictureCid[0])}`} />
                            </div>
                            <div className="">
                                <div>
                                    <Typography.Text className='rd-typo-reverse rd-passport-label'>
                                        username:
                                    </Typography.Text>
                                    <Typography.Title level={2} className='rd-typo-reverse'>
                                        {profile.username}
                                    </Typography.Title>
                                </div>
                            </div>
                        </Space>
                    </Col>
                </Row>
            </div>
        </div>
    )
};

export default RadianPassport;