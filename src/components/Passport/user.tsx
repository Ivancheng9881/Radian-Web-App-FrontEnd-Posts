import { Button, Spin } from "antd";
import { FC } from "react"
import { FullProfile } from "../../schema/profile/profile.interface";
import RadianPassportBase from "./base";

interface PageProps {
    profile: FullProfile,
    clickable?: boolean,
    address?: string,
    isFollowing?: boolean,
    handleFollow?(unfollow?: boolean): void
}

const RadianPassportUser: FC<PageProps> = (props) => {

    const handleFollow = async () => {
        await props.handleFollow();
    }

    return (
        <RadianPassportBase {...props}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Spin spinning={!props.address}>
                    <Button 
                        onClick={handleFollow} 

                        size="large" 
                        shape="round" 
                        type="primary" 
                        className="rd-btn-light" 
                    >
                        {props.isFollowing ? 'Unfollow' : 'Follow'}
                    </Button>
                </Spin>
            </div>
        </RadianPassportBase>
    )
};

export default RadianPassportUser;