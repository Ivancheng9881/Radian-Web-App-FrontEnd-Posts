import { Popover } from "antd";
import { FC } from "react";
import {
    SettingOutlined,
} from '@ant-design/icons';
import { useHistory } from "react-router";
import { settingRoute } from "../../../commons/route";
  
interface PropsType {

};

const styles = {
    root: {},
    icon: {
        fontSize: '1.5rem',
        float: 'right',
    },
} as const;

const PopOverContent : FC = (props) => {
    return (
        <div>
            <p>Edit Profile</p>
            <p></p>
        </div>
    )
}

const ProfileSettings : FC<PropsType> = (props) => {

    const history = useHistory();

    const routeToSettings = () => {
        history.push(settingRoute);
    };

    return (
        // <Popover content={PopOverContent} trigger='click'>
        <SettingOutlined style={styles.icon} onClick={routeToSettings} />
        // </Popover>
    )
};

export default ProfileSettings;