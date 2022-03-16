import { Fragment } from 'react';
import ImageHolder from '../ImageHolder';
import ProfilePictureFrameRoot from './frame';
import './styles.css';

const ProfilePictureFrame = ({ src = undefined}) => {
    return (
        <ProfilePictureFrameRoot>
            {src && <ImageHolder cid={src} />}
        </ProfilePictureFrameRoot>
    );
};

export default ProfilePictureFrame;
