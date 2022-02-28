import { FC } from "react";
import LoadingScreen from "../../LoadingScreen";


const ProfileLoading : FC = (props) => {

    return (
        <div style={{height: '100%', display: 'flex', alignItems: 'center'}}>
            <LoadingScreen />
        </div>
    )
};

export default ProfileLoading;