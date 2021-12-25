import Typography from "../../../../../components/Typography";
import TextField from "../../../../../components/Textfield";
import { useState } from "react";
import Toggler from "../../../../../components/Toggler";

const ProfileHeight = (props) => {

    const unitOpts = [
        { value: 'cm', label: 'cm' },
        { value: 'inch', label: 'inch' }
    ]

    const [ data, setData ] = useState({
        value: '',
        unit: 'cm'
    });

    const handleChange = (e) => {
        e.preventDefault();
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    };

    const toggleUnit = (val) => {
        setData({
            ...data,
            unit: val
        })
    };

    return (
        <div id="RD-CreateProfile-height" className="RD-CreateProfileComponents">
            <Typography.Featured
                alignment='left'
            >
                Basic Info
            </Typography.Featured>
            <div className="pt-4 pb-2">
                <Typography.H2
                    alignment="left"
                >
                    Height
                </Typography.H2>
            </div>
            <div className="mt-10 inline-flex items-end">
                <div className="w-1/3 mr-5">
                    <TextField.Outlined
                        name='value'
                        placeholder={data.unit.toUpperCase()}
                        value={data.value}
                        onChange={handleChange}
                    />
                </div>
                <div className="max-w-sm mr-5">
                    <Toggler 
                        value={data.unit}
                        opts={unitOpts}
                        handleToggle={toggleUnit}
                    />
                </div>
            </div>
        </div>
    )
};


export default ProfileHeight;