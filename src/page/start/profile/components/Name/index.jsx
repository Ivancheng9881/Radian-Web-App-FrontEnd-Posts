import Typography from "../../../../../components/Typography";
import ProfileWrapper from "../Wrapper";
import TextField from "../../../../../components/Textfield";
import { useState } from "react";

const ProfileName = (props) => {

    const [ data, setData ] = useState({
        firstName: '',
        lastName: ''
    });

    const handleChange = (e) => {
        e.preventDefault();
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <ProfileWrapper>
            <Typography.Featured
                alignment='left'
            >
                Create your RADIAN passport
            </Typography.Featured>
            <div className="pt-4 pb-2">
                <Typography.H2
                    alignment="left"
                >
                    My name is
                </Typography.H2>
            </div>
            <div className="mt-10 inline-flex">
                <div className="max-w-sm mr-5">
                    <TextField.Outlined
                        name='firstName'
                        placeholder="Firstname"
                        value={data.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="max-w-sm mr-5">
                    <TextField.Outlined
                        name='lastName'
                        placeholder="Lastname"
                        value={data.lastName}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </ProfileWrapper>
    )
};


export default ProfileName;