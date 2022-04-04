import { MessageOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { FC } from "react";
import { StyleSheet } from "../../schema/helper.interface";


const FloatingChatButton : FC = () => {

    const styles : StyleSheet = {
        root: {
            position: 'fixed',
            right: '32px',
            bottom: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        button: {
            width: '50px',
            height: '50px',
            margin: 'auto',
            marginBottom: '10px'
        },
        icon: {
            fontSize: '1.5rem'
        },
        text: {
            fontSize: '1.2rem'
        },
    }

    const handleClick = () => {
        window.open('https://radian-chat-beta.netlify.com', '_blank')
    }

    return (
        <div style={styles.root}>
            <Button 
                shape="circle" 
                size="large" 
                type="primary" 
                style={styles.button}
                icon={<MessageOutlined style={styles.icon} />} 
                onClick={handleClick}
            />
            <Typography.Text strong style={styles.text}>
                chatroom
            </Typography.Text>
        </div>
    )
};

export default FloatingChatButton;