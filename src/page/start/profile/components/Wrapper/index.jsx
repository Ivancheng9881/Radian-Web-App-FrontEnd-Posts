import './styles.css';

import ArrowDownButton from "../../../../../components/Button/ArrowDownButton.components";
import CreateProfileIndicator from './indicator.components';

const CreateProfileBodyWrapper = ({children}) => {
    return (
        <div id='RD-createProfileRoot' className="relative" >
            <div 
                id='RD-createProfileBody'  
                className="absolute w-full top-40 pl-10 pr-10/" 
            >
                <div className="relative m-auto w-4/5">
                    {children}

                </div>
            </div>
            <div 
                id='RD-createProfileFooterRoot'
                className='absolute w-full bottom-0'
            >
                <div
                    id='RD-createProfileFooterBody'
                    className="relative m-auto w-4/5"
                >
                    <div className="absolute -top-32">
                        <ArrowDownButton />
                    </div>
                    <CreateProfileIndicator />
                </div>
            </div>
        </div>
    )
};

export default CreateProfileBodyWrapper;