import { Menu } from "antd";
import { FC } from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { settingNFTEthRoute, settingNFTPolygonRoute, settingNFTRoute, settingNFTSolanaRoute, settingProfileRoute, settingWalletRoute } from "../../../../commons/route";
import CustomMenuItem from "../../../../components/Menu/MenuItem";
import CustomSubMenu from "../../../../components/Menu/SubMenu";

interface PropsType {
}

const styles = {
    root: {
        padding: 10
    },
    menu: {
        borderRadius: '5px'
    }

} as const;

const SettingMenu : FC<PropsType> = (props) => {

    return (
        <div style={styles.root}>
            <Menu style={styles.menu} theme='dark' selectable={false}>
                <CustomMenuItem 
                    key='item:EditProfile'
                    route={settingProfileRoute}
                >
                        Edit Profile
                </CustomMenuItem>
                <CustomMenuItem 
                    key='item:LinkWallet'
                    route={settingWalletRoute}
                >
                    Link Wallet
                </CustomMenuItem>
                <CustomSubMenu title={`My NFT`} >
                    <CustomMenuItem
                        key='item:NFT:ETH'
                        route={settingNFTEthRoute}
                        isSubItem
                    >
                        ETH
                    </CustomMenuItem>
                    <CustomMenuItem
                        key='item:NFT:Polygon'
                        route={settingNFTPolygonRoute}
                        isSubItem
                    >
                        Polygon
                    </CustomMenuItem>
                    <CustomMenuItem
                        key='item:NFT:Solana'
                        route={settingNFTSolanaRoute}
                        isSubItem
                    >
                        Solana
                    </CustomMenuItem>
                </CustomSubMenu>
            </Menu>
        </div>
    )
};

export default SettingMenu; 