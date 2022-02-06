import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createProfileRoute } from '../../../../../commons/route';

import { buildQueryString, getQuery } from '../../../../../utils/query';
import CreateProfileContext from '../../../context/profile/profile.context';

import EditIcon from '../../../../../components/Icons/edit.components';
import ShowEyesIcon from '../../../../../components/Icons/eyes.components';
import HideEyesIcon from '../../../../../components/Icons/hideEyes.components';

const InfoDisplayGroup = ({ profileKey, label, value, visibleUpdate=null, visibilityData, stepName }) => {
    const history = useHistory();
    const [ hoverStyle, setHoverStyle ] = useState({ display: 'none' });
    const [ IconText, setIconText ] = useState('show');
    const { stepList } = useContext(CreateProfileContext);

    useEffect(()=>{
        let key = Array.isArray(profileKey) ? profileKey.join(",") : profileKey;
        if (visibilityData && Object.keys(visibilityData).includes(key)){
            setIconText(visibilityData[profileKey] ? 'show' : 'hide');
        }
    },[visibleUpdate])

    const constructQuery = (target) => {
        let currentStep = getQuery(history.location.search).step;
        let query = {
            returnStep: currentStep,
            isEdit: true,
            step: target
        };
        let qs = buildQueryString(query);
        history.push({
            pathname: createProfileRoute,
            search: `?${qs}`
        });
    };

    const handleClick = () => {
        let target;
        console.log('clicked step name:', stepName);
        for (let i = 0; i < stepList.length; i++) {
            if (stepList[i].id === stepName) {
                target = i;
                break;
            }
        }
        constructQuery(target);
    };

    const handleToggleVisible = (e, action) => {
        e.preventDefault();
        // update to make field blank when update
        visibleUpdate && visibleUpdate(["visible", profileKey], action == "hide"? false : true);
        return setIconText(action);
    };

    const handleMouseEvent = (e) => {
        setHoverStyle({
            fontSize: 14,
            width: 140,
            position: 'relative',
            zIndex: 99,
            top: -30,
            left: 105
        });
    };
    const handleMouseLeaveEvent = (e) => setHoverStyle({ display: 'none' });

    return (
        <div className="text-theme-white text-xl uppercase pl-6 pr-6 pt-3">
            <div className="border-b-2 inline-flex justify-between items-center align-center w-96 pb-2">
                <div className="">
                    <div>{label}</div>
                    <div className='text-lg'>{value}</div>
                </div>

                <span
                    style={hoverStyle}
                    className="text-center bg-theme-dark-blue text-theme- font-semi cursor-pointe rounded-xl transition-all 2s"
                >
                    {IconText === 'show' ? 'Enable upload' : 'Disable upload'}
                </span>
                <div className="inline-flex">
                    { visibleUpdate && (IconText === 'show' ? (
                        <div
                            className="flex cursor-pointer"
                            onMouseEnter={handleMouseEvent}
                            onMouseLeave={handleMouseLeaveEvent}
                            onClick={(e) => handleToggleVisible(e, 'hide')}
                        >
                            <ShowEyesIcon />
                        </div>
                    ) : (
                        <div
                            className="flex cursor-pointer"
                            onMouseEnter={handleMouseEvent}
                            onMouseLeave={handleMouseLeaveEvent}
                            onClick={(e) => handleToggleVisible(e, 'show')}
                        >
                            <HideEyesIcon />
                        </div>
                    ) )
                    }
                    <div
                        className="flex justify-center items-center align-center cursor-pointer pl-3"
                        onClick={handleClick}
                    >
                        <EditIcon />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoDisplayGroup;
