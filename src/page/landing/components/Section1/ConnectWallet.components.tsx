import { LinkOutlined } from "@ant-design/icons";
import { Space, Button } from "antd";
import { FC } from "react";
import config from "../../../../commons/config";

interface PageProps {
    iconName: string,
    downloadUri: string | undefined,
    title: string,
    onClick: any,
    disabled: boolean,
}

const LandingConnectWallet : FC<PageProps> = ({
    iconName,
    downloadUri,
    title,
    onClick,
    disabled,
}) => {

    return (
        <Space 
            className="rd-landing-wallet-group" 
            direction="vertical" 
            align="center" 
            size='large'
        >
            <img className="rd-img" src={`${config.assets.cdn}/icon/${iconName}`} alt={`connect with ${title}`} />
            <Button 
                type="primary" 
                size="large" 
                shape="round" 
                onClick={onClick}
                disabled={disabled}
            >
                {title}
            </Button>
            {downloadUri 
            ? <Button 
                type="link" 
                icon={<LinkOutlined />} 
                size='large' 
                href={downloadUri} 
                target='_blank' 
            >
                download wallet
            </Button>
            : <Button 
                type="link" 
                size='large' 
                disabled 
            >
                browser not supported
            </Button>            
            }
        </Space>
    )
};

export default LandingConnectWallet;
