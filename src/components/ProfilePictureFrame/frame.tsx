import { Children, FC } from "react";
import config from "../../commons/config";

const styles = {
    root: {
        borderRadius: 10,
        border: `3px solid ${config.theme.lightGreen}`,
    }
}

const ProfilePictureFrameRoot : FC = ({children}) => {
    
    return (
        <div 
            className="RD-ProfilePictureRoot"
            style={styles.root}
        >
            {children}
        </div>
    )
};

export default ProfilePictureFrameRoot;