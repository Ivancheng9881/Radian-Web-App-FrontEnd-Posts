import Typography from "../../../../../components/Typography";
import TextField from "../../../../../components/Textfield";
import { useState } from "react";
import Toggler from "../../../../../components/Toggler";

const ProfileWeight = (props) => {

    const unitOpts = [
        { value: 'lbs', label: 'lbs' },
        { value: 'kg', label: 'kg' }
    ]

    const [ data, setData ] = useState({
        value: undefined,
        unit: 'lbs'
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
    }

    return (
        <div id="RD-CreateProfile-weight" className="RD-CreateProfileComponents">
            <Typography.Featured
                alignment='left'
            >
                Basic Info
            </Typography.Featured>
            <div className="pt-4 pb-2">
                <Typography.H2
                    alignment="left"
                >
                    Weight
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


export default ProfileWeight;