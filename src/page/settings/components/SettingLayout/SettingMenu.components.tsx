import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { FC } from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { settingNFTRoute, settingProfileRoute, settingWalletRoute } from "../../../../commons/route";
import CustomMenuItem from "../../../../components/Menu/MenuItem";

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
                <CustomMenuItem 
                    key='item:ImportNFT'
                    route={settingNFTRoute}
                >
                    My NFT
                </CustomMenuItem>
            </Menu>
        </div>
    )
};

export default SettingMenu; 