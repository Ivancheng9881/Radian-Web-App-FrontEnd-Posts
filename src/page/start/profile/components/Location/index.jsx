import Typography from "../../../../../components/Typography";
import TextField from "../../../../../components/Textfield";
import { useState } from "react";

const ProfileLocation = (props) => {

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
        <div id="RD-CreateProfile-location" className="RD-CreateProfileComponents">
            <Typography.Featured
                alignment='left'
            >
                Basic Info
            </Typography.Featured>
            <div className="pt-4 pb-2">
                <Typography.H2
                    alignment="left"
                >
                    Your Location
                </Typography.H2>
            </div>
            <div className="mt-10 inline-flex">
                <div className="w-1/3 mr-5">
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
        </div>
    )
};


export default ProfileLocation;