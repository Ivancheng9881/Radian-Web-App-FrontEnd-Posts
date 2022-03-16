import { Col, Row, Spin, Typography } from "antd";
import { FC, useContext } from "react";
import { truncateAddress } from "../../../../utils/web3/general/parser.utils";
import LinkWalletContext from "../context/linkWallet.context";
import { LinkWalletContextType } from "../context/linkWallet.interface";


const LinkProfileHeader: FC = () => {

    const linkWalletContext: LinkWalletContextType = useContext(LinkWalletContext);

    return (
        <div>
            <Typography.Title level={2} >Bind your profile with additional addresses</Typography.Title>
            <Typography.Title level={3} >Current Profile</Typography.Title>

            <Spin spinning={!(linkWalletContext.targetProfile?.profileID > 0)} >
                <Row gutter={[12, 12]}>
                    <Col span={12} >
                        <Row >
                            <Col span={24}>Profile Address:</Col>
                            <Col span={24}>
                                <Typography.Text strong >
                                {linkWalletContext.targetProfile &&
                        truncateAddress(linkWalletContext.targetProfile?.address, 16)}
                                </Typography.Text>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12} >
                        <Row >
                            <Col span={24}>Profile ID:</Col>
                            <Col span={24}>
                                <Typography.Text strong >
                                {linkWalletContext.targetProfile?.profileID}
                                </Typography.Text>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12} >
                        <Row >
                            <Col span={24}>Network:</Col>
                            <Col span={24}>
                                <Typography.Text strong >
                                {linkWalletContext.targetProfile?.provider}
                                </Typography.Text>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12} >
                        <Row >
                            <Col span={24}>Mapped Addresses:</Col>
                            <Col span={24}>
                                {linkWalletContext.targetProfile?.mappedAddresses.map((a) => {
                                return <Col span={24} key={a} >
                                    <Typography.Text strong>{truncateAddress(a, 16)}</Typography.Text> 
                                </Col>})}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Spin>
        </div>
    )
};

export default LinkProfileHeader