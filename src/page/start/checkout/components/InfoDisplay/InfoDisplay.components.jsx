import { useEffect, useState } from 'react';

const InfoDisplayGroup = ({ profileKey, label, value, visibleUpdate=null, visibilityData, stepName }) => {
    const [ IconText, setIconText ] = useState('show');

    useEffect(()=>{
        let key = Array.isArray(profileKey) ? profileKey.join(",") : profileKey;
        if (visibilityData && Object.keys(visibilityData).includes(key)){
            setIconText(visibilityData[profileKey] ? 'show' : 'hide');
        }
    },[visibleUpdate])

    return (
        <div className="text-theme-white text-xl md:px-6 pt-3">
            <div className="relative border-b-2 inline-flex justify-between items-center align-center w-auto pb-2">
                
                <div className="w-80 overflow-hidden">
                    <div className='uppercase'>{label}</div>
                    {value ?
                        <div className={`text-lg w-64 truncate uppercase ${IconText === 'hide' && "line-through"}`}>{value}</div>
                        :
                        <div className='text-sm text-theme-red'> Field Empty </div>
                    }
                    
                </div>

                <div className='absolute right-20 top-2'>
                </div>
            </div>
        </div>
    );
};

export default InfoDisplayGroup;
