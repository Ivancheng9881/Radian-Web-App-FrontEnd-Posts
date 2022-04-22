import { FC } from "react";
import { Col, Spin, Typography } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

interface PageProps {
    isLoading: boolean,
    disabled?: boolean,
    onClick(): Promise<void>
}

const NFTGridItemLoadmore : FC<PageProps> = ({
    isLoading,
    onClick,
    disabled
}) => {
    return (
        <Col lg={4}>
            <Spin spinning={isLoading}>
                <div 
                    className="rd-nft-grid-item-root rd-nft-grid-more-root rd-flexbox rd-flexbox-vertical-center"
                    onClick={onClick}
                >
                    <div className="rd-flexbox rd-flexbox-horizontal">
                        <div className="rd-flexbox rd-flexbox-vertical">
                            <PlusCircleOutlined />
                            <Typography.Title level={5}>
                                Load More
                            </Typography.Title>
                        </div>
                    </div>
                </div>
            </Spin>
        </Col>
    )
};

export default NFTGridItemLoadmore;