import React, { FC, useContext, useState } from "react";
import CustomTypography from "../../../components/Typography";
import InfoDisplayGroup from "../../start/checkout/components/InfoDisplay/InfoDisplay.components";
import UserContext from "../../../utils/user/context/user.context";
import { FullProfile } from "../../../schema/profile/profile.interface";
import ProfilePictureFrame from "../../../components/ProfilePictureFrame";
import ipfsUtils from "../../../utils/web3/ipfs/ipfs.utils";
import { Button, Col, Input, Row, Space } from "antd";
import { FixLater } from "../../../schema/helper.interface";
import EditProfileLabel from "./components/label.component";
import EditProfileInput from "./components/input.component";
import EditProfileSelect from "./components/select.component";
import { SelectOptionType } from "../../../schema/form/select.interface";
import { country_code_list } from "../../start/profile/components/Phone/countryCode.json";
import EditProfileTags from "./components/tags.component";
import { interestOptions } from "../../start/profile/components/Interest/options";
import EditProfileButtonGroup from "./components/buttonGroup.component";
import ProfileContractUtils from "../../../utils/web3/contract/profileContract/utils";
import { createProfileErc, getProfileErc } from '../../../utils/web3/contract/profileContract/erc';
import Web3Context from "../../../utils/web3/context/web3.context";

type InputEventType = React.ChangeEvent<HTMLInputElement>

interface PropsType {
    profile: FullProfile,
    setProfile: FixLater,
};

const styles = {
    root: {
        padding: 5,
    },
    body: {
        width: '100%',
        maxWidth: 800,
    },
    row: {
        marginBottom: 16,
    }
} as const;

const genderOption: SelectOptionType[] = [
    { value: 'male', label: 'male', },
    { value: 'female', label: 'female', } 
];

const EditProfileForm : FC<PropsType> = ({
    profile,
    setProfile,
}) => {

    const [ disabled, setDisabled ] = useState<boolean>(true);
    const web3Context = useContext(Web3Context);

    const handleProfileUpdate = async () => {
        let cid = await ProfileContractUtils.createProfileCid(profile);
        let txn = await createProfileErc(cid.toString(), false);
    }

    const clickPrimary = () => {
        if (disabled) {
            setDisabled(false);
        } else {
            setDisabled(true);
            handleProfileUpdate();
        }
    };

    const handleChange = (e: InputEventType, key: string) => {
        setProfile({
            ...profile,
            [key]: e.target.value,
        })
    }

    const handleSelectChange = (value: string, key: string) => {
        setProfile({
            ...profile,
            [key]: value
        })
    };

    const handleTagAdd = (value: string, key: string) => {
        if (profile[key].includes(value)) return ;

        setProfile({
            ...profile,
            [key]: [...profile[key], value]
        })
    };

    const handleRemove = (val: string, key: string,) => {
        let idx = profile[key].indexOf(val);
        let arr = [...profile[key]];
        arr.splice(idx, 1);
        console.log(arr)
        setProfile({
            ...profile,
            [key]: arr
        })
    } 

    return (
        <div style={styles.root}>
            <Space direction="vertical" style={styles.body}>
                <div className="w-auto md:w-1/3 mb-4">
                    <div className="text-2xl mb-4 text-theme-white font-semibold text-center md:text-left">Profile Images</div>
                    <div className='flex flex-wrap gap-5 justify-center md:justify-start'>
                        {
                            profile.profilePictureCid?.map((k: string) => {
                            return <ProfilePictureFrame
                                key={`profilePictureCid_${k}`}
                                src={ipfsUtils.getContentUrl(k)} 
                            />    
                        })}
                    </div>
                </div>

                <div className="w-full">
                    {/* <div className="mb-10">
                    <div className="pl-6 pr-6 text-2xl mb-4 text-theme-white font-semibold text-center md:text-left">Addresses</div>
                        <InfoDisplayGroup
                                profileKey="firstName"
                                label={`ERC-Addresses`}
                                value={"1 - 0x123456567789"}
                                stepName={`name`} />
                        <InfoDisplayGroup
                                profileKey="firstName"
                                value={"2 - 0x123456567789"}
                                stepName={`name`} />
                        <InfoDisplayGroup
                                profileKey="firstName"
                                value={"3 - 0x123456567789"}
                                stepName={`name`} />
                        <div className="text-theme-white text-lg md:px-28 pt-10">
                            <div className="relative inline-flex align-center w-auto pb-2">
                                <Button
                                    shape="round"
                                    onClick={handleClick}
                                >
                                    Add Wallet
                                </Button>
                            </div>
                        </div>
                    </div> */}
{/* 
                    <Row gutter={12} >
                    {formSchema.map((row) => {
                        return <EditProfileRow 
                            row={row} 
                            value={profile[row.key]} 
                        />
                    })}
                    </Row>
                     */}
                    <Row style={styles.row} gutter={24}>
                        <Col span={6} >
                            <EditProfileLabel>
                                Name
                            </EditProfileLabel>
                        </Col>
                        <Col span={9} >
                            <EditProfileInput 
                                value={profile.firstName} 
                                disabled={disabled}
                                onChange={(e: InputEventType) => handleChange(e, 'firstName')}
                            />
                        </Col>
                        <Col span={9} >
                            <EditProfileInput 
                                value={profile.lastName} 
                                disabled={disabled}
                                onChange={(e: InputEventType) => handleChange(e, 'lastName')}
                            />
                        </Col>
                    </Row>
                    <Row style={styles.row} gutter={24}>
                        <Col span={6} >
                            <EditProfileLabel>
                                Gender
                            </EditProfileLabel>
                        </Col>
                        <Col span={9} >
                            <EditProfileSelect 
                                value={profile.gender} 
                                disabled={disabled}
                                options={genderOption}
                                onChange={(val: string) => handleSelectChange(val, 'gender')}
                            />
                        </Col>
                    </Row>
                    <Row style={styles.row} gutter={24}>
                        <Col span={6} >
                            <EditProfileLabel>
                                Phone
                            </EditProfileLabel>
                        </Col>
                        <Col span={9} >
                            <EditProfileSelect 
                                value={profile.countryCode} 
                                disabled={disabled}
                                options={country_code_list.map((c) => {return {value: c, label: c}})}
                                onChange={(val: string) => handleSelectChange(val, 'countryCode')}
                            />
                        </Col>
                        <Col span={9} >
                            <EditProfileInput 
                                value={profile.number} 
                                disabled={disabled}
                                onChange={(e: InputEventType) => handleChange(e, 'number')}
                            />
                        </Col>
                    </Row> 
                    <Row style={styles.row} gutter={24}>
                        <Col span={6} >
                            <EditProfileLabel>
                                Phone
                            </EditProfileLabel>
                        </Col>
                        <Col span={9} >
                            <EditProfileInput 
                                value={profile.nationality} 
                                disabled={disabled}
                                onChange={(e: InputEventType) => handleChange(e, 'nationality')}
                            />
                        </Col>
                    </Row>
                    <Row style={styles.row} gutter={24}>
                        <Col span={6} >
                            <EditProfileLabel>
                                Interests
                            </EditProfileLabel>
                        </Col>
                        <Col span={9} >
                            <EditProfileTags 
                                value={profile.interest} 
                                disabled={disabled}
                                options={interestOptions}
                                onClose={(v: string) => handleRemove(v, 'interest')}
                                onAdd={(v: string) => handleTagAdd(v, 'interest')}
                            />
                        </Col>
                    </Row>
                </div>
                <EditProfileButtonGroup 
                    disabled={disabled}
                    clickPrimary={clickPrimary}
                />
            </Space>
        </div>
    )
};

export default EditProfileForm;