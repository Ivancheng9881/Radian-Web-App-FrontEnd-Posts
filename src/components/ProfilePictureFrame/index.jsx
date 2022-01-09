import { Fragment } from 'react';
import './styles.css';

const ProfilePictureFrame = ({
    src=undefined,
    maxHeight=400,
    maxWidth=400,
    children,
}) => {
    console.log(src)
    return (
        <Fragment>
            {src && <div className="RD-ProfilePictureRoot rounded-lg border-2" >
                <img 
                    src={src}
                />
            </div>}
        </Fragment>

    )
};

export default ProfilePictureFrame;