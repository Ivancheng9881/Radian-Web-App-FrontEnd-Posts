import { Col, Row, Space, Typography } from "antd";
import { FC } from "react";
import config from "../../commons/config";

interface DefaultFooterProps {
    disableGutter?: boolean
}

const DefaultFooter : FC<DefaultFooterProps> = (props) => {
    const { disableGutter = false } = props 

    return (
        <div className={`rd-footer-root ${disableGutter ? 'rd-footer-root-no-gutter' : ''}`}>
            <div className="rd-footer" >
                <div className="rd-footer-content">
                <Row gutter={[0, {xs: 12, sm: 24, md: 24}]}>
                    <Col lg={12} md={24}> 
                        <Space direction='vertical' size='large' >
                            <div>
                                <img className="rd-footer-logo" src={`${config.assets.cdn}/logo/logo_black.png`} alt='RADIAN logo' />
                            </div>
                            <Space className="rd-footer-social" direction="horizontal" size='large'>
                                <a href='https://www.instagram.com/radiancommunity/' target={'_blank'} >
                                    <img src={`${config.assets.cdn}/icon/instagram_white.png`} alt='follow us on Instagram' />
                                </a>
                                <a href='https://radiancommunity.medium.com/' target={'_blank'} >
                                    <img src={`${config.assets.cdn}/icon/medium_white.png`} alt='follow us on Medium' />
                                </a>
                                <a href='https://t.me/RADIANCommunity' target={'_blank'} >
                                    <img src={`${config.assets.cdn}/icon/discord_white.png`} alt='follow us on Discord' />
                                </a>
                                <a href='https://twitter.com/RADIANcommunity' target={'_blank'} >
                                    <img src={`${config.assets.cdn}/icon/twitter_white.png`} alt='follow us on Twitter' />
                                </a>
                            </Space>
                        </Space>
                    </Col>
                    <Col lg={12} md={24}>
                        <Typography.Text className="rd-footer-text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Habitant nisi, gravida mauris lacus scelerisque sit nunc. Integer nibh nunc integer eu mi. Nunc nisl quam vitae turpis a non. At viverra morbi nunc quis vitae fames sed lacus. Nunc consectetur ultricies condimentum proin lectus velit mattis. Nec, id interdum commodo urna, suspendisse et ut. Turpis sapien nisl augue auctor pretium odio senectus ut. Mauris turpis semperquam vitae turpis a non. At viverra morbi nunc quis vitae fames sed lacus. Nunc consectetur ultricies condimentum proin lectus velit mattis. Nec, id interdum commodo urna, suspendisse et ut. Turpis sapien nisl augue auctor pretium odio senectus ut. Mauris turpis semper
                        </Typography.Text>
                    </Col>
                </Row>
                </div>

            </div>
        </div>
    )
};

export default DefaultFooter;