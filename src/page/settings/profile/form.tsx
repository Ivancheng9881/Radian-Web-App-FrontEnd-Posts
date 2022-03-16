import React, { FC, useContext, useEffect, useState } from "react";
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
import CreateProfilePopup from "../../../components/CreateProfilePopup";
import ProfilePictureUpload from "../../../components/ProfilePictureFrame/uploadButton.components";

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
        margin: 'auto'
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
    
    const web3Context = useContext(Web3Context)

    const [ disabled, setDisabled ] = useState<boolean>(true);
    const [ popupOpen, setPopupOpen ] = useState<boolean>(false);
    const [ popupNetwork, setPopupNetwork ] = useState<string>('');
    const [ cid, setCid ] = useState(null);

    useEffect(() => {
        if (web3Context.providers) {
            let network;
            switch(web3Context.providers.selected) {
                case 'phantom@solana':
                    network = 'solana'
                    break
                case 'metamask@erc':
                    network = 'polygon'
                    break
                default:
                    break
            }
            setPopupNetwork(network);
        }
    }, [web3Context.providers])

    const handleProfileUpdate = async () => {
        let cid = await ProfileContractUtils.createProfileCid(profile);
        setCid(cid);
        setPopupOpen(true);
    }

    const handleConfirm = () : void => {
        handleProfileUpdate();
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
        setProfile({
            ...profile,
            [key]: arr
        })
    };

    const onPropicUpload = (cid: string) => {
        setProfile({
            ...profile,
            profilePictureCid: [cid],
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
                            return <ProfilePictureUpload
                                disabled={disabled}
                                key={`profilePictureCid_${k}`}
                                cid={k} 
                                onUpload={onPropicUpload}
                            />    
                        })}
                    </div>
                </div>

                <div className="w-full">
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
                                Nationality
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
                        <Col span={18} >
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
                    setDisabled={setDisabled}
                    handleConfirm={handleConfirm}
                />
                <CreateProfilePopup 
                    open={popupOpen}
                    setOpen={setPopupOpen}
                    network={popupNetwork}
                    cid={cid}
                />
            </Space>
        </div>
    )
};

export default EditProfileForm;