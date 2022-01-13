import './styles.css';

import ArrowDownButton from "../../../../../components/Button/ArrowDownButton.components";
import ArrowUpButton from "../../../../../components/Button/ArrowUpButton.components";
import CreateProfileIndicator from './indicator.components';
import { useContext } from 'react';
import CreateProfileContext from '../../../context/profile.context';

const CreateProfileBodyWrapper = ({children}) => {

    const { step, updateStep, stepList, setScrollDirection } = useContext(CreateProfileContext);

    const nextStep = (e) => {
        e.preventDefault();
        setScrollDirection(true);
        let val = step;
        val++;
        updateStep(val);
    };

    const prevStep = (e) => {
        e.preventDefault();
        setScrollDirection(false);
        let val = step;
        val--;
        updateStep(val);
    }

    return (
        <div id='RD-createProfileRoot' className="relative " >
            <div 
                id='RD-createProfileBody'  
                className="h-100 w-full pt-64 pl-10 pr-10 bg-theme-bg-dark" 
            >
                <div className="relative m-auto w-4/5">
                    {children}

                </div>
            </div>
            <div 
                id='RD-createProfileFooterRoot'
                className='fixed w-full bottom-0'
            >
                <div
                    id='RD-createProfileFooterBody'
                    className="relative m-auto w-4/5"
                >
                    <div className="absolute -top-32">
                        <div className='inline-flex'>
                            <div className={`pr-2 pl-2`}>
                                <ArrowUpButton 
                                    onClick={prevStep} 
                                    disabled={step==0} 
                                />
                            </div>
                            <div className='pr-2 pl-2'>
                                <ArrowDownButton 
                                    onClick={nextStep} 
                                    disabled={step>=stepList.length - 1}
                                />
                            </div>
                        </div>
                    </div>
                    <CreateProfileIndicator />
                </div>
            </div>
        </div>
    )
};

export default CreateProfileBodyWrapper;