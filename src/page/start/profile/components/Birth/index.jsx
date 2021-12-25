import Typography from "../../../../../components/Typography";
import TextField from "../../../../../components/Textfield";
import { useState } from "react";

const ProfileBirth = (props) => {

    const [ data, setData ] = useState({
        day: '',
        month: '',
        year: ''
    });

    /**
     * @todo validate is number 
     */
    const handleChange = (e) => {
        e.preventDefault();
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div id="RD-CreateProfile-dob" className="RD-CreateProfileComponents">
            <Typography.Featured
                alignment='left'
            >
                Basic Info
            </Typography.Featured>
            <div className="pt-4 pb-2">
                <Typography.H2
                    alignment="left"
                >
                    Birthday is on the
                </Typography.H2>
            </div>
            <div className="mt-10 inline-flex">
                <div className="w-48 mr-5">
                    <TextField.Outlined
                        name='day'
                        placeholder="DD"
                        value={data.day}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-48 mr-5">
                    <TextField.Outlined
                        name='month'
                        placeholder="MM"
                        value={data.month}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-48 mr-5">
                    <TextField.Outlined
                        name='year'
                        placeholder="YYYY"
                        value={data.year}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    )
};


export default ProfileBirth;