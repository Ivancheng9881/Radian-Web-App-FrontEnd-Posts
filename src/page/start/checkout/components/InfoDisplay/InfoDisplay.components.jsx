import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { createProfileRoute } from '../../../../../commons/route';
import EditIcon from '../../../../../components/Icons/edit.components';
import EyesIcon from '../../../../../components/Icons/eyes.components';
import { buildQueryString, getQuery } from '../../../../../utils/query';
import CreateProfileContext from '../../../context/profile/profile.context';

const InfoDisplayGroup = ({ label, value, stepName }) => {
    const history = useHistory();
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
        console.log('clicked step name:', stepName);
        for (let i = 0; i < stepList.length; i++) {
            if (stepList[i].id === stepName) {
                target = i;
                break;
            }
        }
        constructQuery(target);
    };

    const handleToggleVisible = () => {};

    return (
        <div className="text-theme-white text-xl uppercase pl-6 pr-6 pt-3">
            <div className="border-b-2 inline-flex justify-between w-96 pb-2">
                <div className="">
                    <div>{label}</div>
                    <div>{value}</div>
                </div>
                <div className="inline-flex">
                    <div className="flex cursor-pointer" onClick={handleToggleVisible}>
                        <EyesIcon />
                    </div>
                    <div className="flex cursor-pointer pl-5" onClick={handleClick}>
                        <EditIcon />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoDisplayGroup;
