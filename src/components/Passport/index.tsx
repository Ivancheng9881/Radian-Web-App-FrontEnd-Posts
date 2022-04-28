import { Button, Col, Image, Row, Space, Tag, Typography } from "antd";
import { FC, useEffect, useState } from "react"
import { useImage } from "react-image";
import { useHistory, useLocation } from "react-router";
import config from "../../commons/config";
import { PASSPORT_ME_ROUTE, PASSPORT_ROUTE } from "../../commons/route";
import { FullProfile } from "../../schema/profile/profile.interface";
import ipfsUtils from "../../utils/web3/ipfs/ipfs.utils";

interface PageProps {
    profile: FullProfile,
    clickable?: boolean
}

const RadianPassport: FC<PageProps> = (props) => {
    const { profile, clickable=false} = props;
    const history = useHistory();
    const location = useLocation()

    const [ imgList, setImgList ] = useState<string[]>([]);

    const routeToPassportMe = () => {
        let path = location.pathname === PASSPORT_ROUTE ? PASSPORT_ME_ROUTE : PASSPORT_ROUTE;
        history.push({
            pathname: path,
            state: {
                scrollTo: 'nft'
            }
        });
    }

    useEffect(() => {
        if (profile?.profilePictureCid?.length > 0) {
            setImgList(ipfsUtils.getImageFromCDNFailover(profile.profilePictureCid[0]))
        }
    }, [profile?.profilePictureCid])

    return (
        <div className="rd-passport-root">
            <div className="rd-passport-body">
                <Row style={{height: '100%'}} gutter={[36, 0]}>
                    <Col lg={8} >
                        <Space direction="vertical" size='large' style={{height: '100%', gap: 56}} >
                            <Image
                                src={`${config.assets.cdn}/logo/logo_black.png`} 
                                preview={false}
                                width={200}
                            />
                            <div className="rd-passport-avatar">
                                <Image 
                                    src={imgList.length > 0 && imgList[0]}
                                    fallback={imgList.length > 0 && imgList[1]}
                                    placeholder={<img src={`${config.assets.cdn}/misc/propic_placeholder.png`} />}
                                    preview={false}     
                                />
                            </div>
                            <div className="rd-passport-username">
                                <Typography.Text className='rd-typo-reverse rd-passport-label'>
                                    username:
                                </Typography.Text>
                                <Typography.Title level={3} className='rd-typo-reverse'>
                                    {profile.username?.toUpperCase() || ''}
                                </Typography.Title>
                            </div>
                        </Space>
                    </Col>
                    <Col lg={16}>
                        <Space 
                            direction="vertical" 
                            size='large' 
                            style={{height: '100%', paddingTop: 55}} 
                        >
                            <Row gutter={[36, 36]}>
                                <Col lg={12} >
                                    <Typography.Text className="rd-passport-label rd-typo-reverse">
                                        Name:
                                    </Typography.Text>
                                    <div className="rd-passport-field">
                                        <Typography.Title level={5} className='rd-typo-reverse'>
                                            {profile.firstName || ''} {profile.lastName}
                                        </Typography.Title>
                                    </div>
                                </Col>
                                <Col lg={12} >
                                    <Typography.Text className="rd-passport-label rd-typo-reverse">
                                        Religion:
                                    </Typography.Text>
                                    <div className="rd-passport-field">
                                        <Typography.Title level={5} className='rd-typo-reverse'>
                                            {profile.religion}
                                        </Typography.Title>
                                    </div>
                                </Col>
                                <Col lg={12} >
                                    <Typography.Text className="rd-passport-label rd-typo-reverse">
                                        Gender:
                                    </Typography.Text>
                                    <div className="rd-passport-field">
                                        <Typography.Title level={5} className='rd-typo-reverse'>
                                            {profile.gender}
                                        </Typography.Title>
                                    </div>
                                </Col>
                                <Col lg={12} >
                                    <Typography.Text className="rd-passport-label rd-typo-reverse">
                                        Nationality:
                                    </Typography.Text>
                                    <div className="rd-passport-field">
                                        <Typography.Title level={5} className='rd-typo-reverse'>
                                            {profile.nationality}
                                        </Typography.Title>
                                    </div>
                                </Col>
                                <Col lg={12} >
                                    <Typography.Text className="rd-passport-label rd-typo-reverse">
                                        Located in:
                                    </Typography.Text>
                                    <div className="rd-passport-field">
                                        <Typography.Title level={5} className='rd-typo-reverse'>
                                            {profile.location}
                                        </Typography.Title>
                                    </div>
                                </Col>
                                <Col lg={12} >
                                    <Typography.Text className="rd-passport-label rd-typo-reverse">
                                        Ethnicity:
                                    </Typography.Text>
                                    <div className="rd-passport-field">
                                        <Typography.Title level={5} className='rd-typo-reverse'>
                                            {profile.ethnicity}
                                        </Typography.Title>
                                    </div>
                                </Col>
                                <Col lg={16}>
                                    <Typography.Text className="rd-passport-label rd-typo-reverse">
                                        Interests:
                                    </Typography.Text>

                                    <div className="rd-passport-tag">
                                        {profile.tags?.map((i: string) => {
                                        return <Tag className="rd-tag rd-tag-light" key={`passport-interest-${i}`} >{i}</Tag>
                                    })}
                                    </div>
                                </Col>
                                {<Col lg={8} style={{paddingTop: 60}} >
                                    <Button onClick={routeToPassportMe} size="large" shape="round" type="primary" className="rd-btn-light" >
                                        {location.pathname === PASSPORT_ROUTE ? 'Assets' : 'Back'}
                                    </Button>
                                </Col>}
                            </Row>
                        </Space>
                    </Col>
                </Row>
            </div>
        </div>
    )
};

export default RadianPassport;