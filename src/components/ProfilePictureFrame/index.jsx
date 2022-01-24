import { Fragment } from 'react';
import './styles.css';

const ProfilePictureFrame = ({ src = undefined, maxHeight = 400, maxWidth = 400, children }) => {
    return (
        <Fragment>
            {src && (
                <div className="RD-ProfilePictureRoot border-4 border-theme-lightGreen rounded-lg border-2">
                    <img className="img-fluid" src={src} />
                </div>
            )}
        </Fragment>
    );
};

export default ProfilePictureFrame;
