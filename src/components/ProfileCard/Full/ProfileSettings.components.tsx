import { Popover } from "antd";
import { FC } from "react";
import {
    SettingOutlined,
} from '@ant-design/icons';
  
interface PropsType {

};

const styles = {
    root: {},
    icon: {
        fontSize: '1.5rem',
        float: 'right',
    },
} as const;

const PopOverContent = (
    <div>
        <p>Edit Profile</p>
    </div>
)

const ProfileSettings : FC<PropsType> = () => {

    return (
        <Popover content={PopOverContent} trigger='click'>
            <SettingOutlined style={styles.icon} />
        </Popover>
    )
};

export default ProfileSettings;