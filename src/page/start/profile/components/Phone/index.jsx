import Typography from "../../../../../components/Typography";
import TextField from "../../../../../components/Textfield";
import { useState } from "react";

const ProfilePhone = (props) => {

    const [ data, setData ] = useState({
        countryCode: '',
        number: ''
    });

    const handleChange = (e) => {
        e.preventDefault();
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div id='RD-CreateProfile-phone' className="RD-CreateProfileComponents"> 
            <Typography.Featured
                alignment='left'
            >
                Basic Info
            </Typography.Featured>
            <div className="pt-4 pb-2">
                <Typography.H2
                    alignment="left"
                >
                    You can reach me at
                </Typography.H2>
            </div>
            <div className="mt-10 inline-flex">
                <div className="max-w-none w-60 mr-5">
                    <TextField.Outlined
                        name='countryCode'
                        placeholder="Country Code"
                        value={data.countryCode}
                        onChange={handleChange}
                    />
                </div>
                <div className="max-w-sm mr-5">
                    <TextField.Outlined
                        name='number'
                        placeholder="000000000"
                        value={data.number}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    )
};


export default ProfilePhone;