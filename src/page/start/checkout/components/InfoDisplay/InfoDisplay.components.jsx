import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createProfileRoute } from '../../../../../commons/route';

import { buildQueryString, getQuery } from '../../../../../utils/query';
import CreateProfileContext from '../../../context/profile/profile.context';

import EditIcon from '../../../../../components/Icons/edit.components';
import EyesIcon from '../../../../../components/Icons/eyes.components';
import HideEyesIcon from '../../../../../components/Icons/hideEyes.components';


const InfoDisplayGroup = ({ label, value, stepName }) => {
    const history = useHistory();
    const [ hoverStyle, setHoverStyle ] = useState({display: 'none'})
    const { stepList } = useContext(CreateProfileContext);

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
        console.log('stepName', stepName);
        for (let i = 0; i < stepList.length; i++) {
            if (stepList[i].id === stepName) {
                target = i;
                break;
            }
        }
        constructQuery(target);
    };

    const handleToggleVisible = (e) => {
        console.log('eyeIcon click', e)
        
        //show HideEyesIcon once is clicked

        //else default open eyes icon 
    };

    const handleMouseEvent = (e) => {
        console.log('handleMouseEvent', e)
        setHoverStyle({display: 'block'})
    }
    const handleMouseLeaveEvent = (e) => {
        console.log('handleMouseLeaveEvent', e)
        setHoverStyle({display: 'none'})
    }
    // handleMouseHoverEvent(()=> {
    //     let infoDisplayId = document.getElementById("RD-infoDisplay");
    //     console.log(infoDisplayId)
    //     textarea.type = 'text';
    //     textarea.removeAttribute('autocomplete');
    // },[]);

    // EnterMouseEnterEvent show box
    // EnterMouseOutEvent show box
    return (
        <div id="RD-infoDisplay" className="text-theme-white text-xl uppercase pl-6 pr-6 pt-6">
            <div className="border-b-2 inline-flex justify-between w-96 pb-2">
                <div className="">
                    <div>{label}</div>
                    <div>{value}</div>
                </div>
                <div className="inline-flex">
                    <div className="flex cursor-pointer" onMouseEnter={handleMouseEvent} onMouseLeave={handleMouseLeaveEvent} onClick={handleToggleVisible}>
                        <EyesIcon /> 
                        {/* <HideEyesIcon/> */}
                    </div>
                    <div className="flex cursor-pointer pl-5" onClick={handleClick}>
                        <EditIcon />
                    </div>
                </div>
                
                <div style={hoverStyle}>I am childen</div>
            </div>
        </div>
    );
};

export default InfoDisplayGroup;
