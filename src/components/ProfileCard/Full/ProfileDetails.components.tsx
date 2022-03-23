import { Space, Typography } from "antd";
import { FC } from "react";
import { FullProfile } from "../../../schema/profile/profile.interface";
import { truncateAddress } from "../../../utils/web3/general/parser.utils";

interface PropsType {
    profile: FullProfile
};

const styles = {
    root: {
        paddingTop: '1rem'
    },

} as const;

const ProfileDetails: FC<PropsType> = ({profile}) =>  {

    return (
        <div style={styles.root}>
            <Space direction="vertical" size='large'> 
                <div>
                    0 Following(s) | 0 Follower(s)
                </div>
                <div>
                    <Typography.Title level={5}>
                        Personal Information
                    </Typography.Title>
                    <div className='font-normal text-sm'>
                        {profile.gender && `Gender: ${profile.gender}`}
                    </div>
                    <div className='font-normal text-sm'>
                        {profile.nationality && `Nationality: ${profile.nationality}`}
                    </div>
                    <div className='font-normal text-sm'>
                        {profile.interest && `Interest: ${profile.interest}`}
                    </div>
                </div>
                <div>
                    {profile.addresses?.length > 0 && <Typography.Title level={5}>
                        Wallet(s):
                    </Typography.Title>}
                    <div className='font-normal text-sm'>
                        {profile.addresses?.map((a) => {
                            return (
                                <Typography.Paragraph 
                                    copyable 
                                    key={a.address}
                                >
                                    {a.address}
                                </Typography.Paragraph>
                            )
                        })}
                    </div>
                </div>


            </Space>
        </div>
    )
};

export default ProfileDetails;