import { Fragment } from 'react';
import ProfilePictureFrameRoot from './frame';
import './styles.css';

const ProfilePictureFrame = ({ src = undefined, maxHeight = 400, maxWidth = 400 }) => {
    return (
        <ProfilePictureFrameRoot>
            {src && <img className="img-fluid" src={src} />}
        </ProfilePictureFrameRoot>
    );
};

export default ProfilePictureFrame;
