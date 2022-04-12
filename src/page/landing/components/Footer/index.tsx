import { Col, Grid, Row, Space, Typography } from "antd";
import { FC } from "react";
import config from "../../../../commons/config";

const DefaultFooter : FC = () => {

    return (
        <div className="rd-footer-root">
            <div className="rd-footer" >
                <div className="rd-footer-content">
                <Row >
                    <Col span={12}>
                        <Space direction='vertical' size='large' >
                            <div>
                                <img src={`${config.assets.cdn}/logo/logo_black.png`} alt='RADIAN logo' />
                            </div>
                            <Space direction="horizontal" size='large'>
                                <img src={`${config.assets.cdn}/icon/instagram_white.png`} alt='follow us on Instagram' />
                                <img src={`${config.assets.cdn}/icon/medium_white.png`} alt='follow us on Medium' />
                                <img src={`${config.assets.cdn}/icon/discord_white.png`} alt='follow us on Discord' />
                                <img src={`${config.assets.cdn}/icon/twitter_white.png`} alt='follow us on Twitter' />
                            </Space>
                        </Space>
                    </Col>
                    <Col span={12}>
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