import { useContext, useEffect } from "react";
import ArrowDownButton from "../../../../../components/Button/ArrowDownButton.components";
import ArrowUpButton from "../../../../../components/Button/ArrowUpButton.components";
import CreateProfileContext from "../../../context/profile/profile.context";
import CreateProfileIndicator from "../../../components/indicator.components"
import { Button } from "antd";
import ArrowDownIcon from "../../../../../components/Icons/arrowDown.components";

const CheckoutWrapper = ({ children }) => {

    const {
        checkoutStep,
        checkoutStepList,
        updateCheckoutStep,
        setScrollDirection,
        nextDisabled
    } = useContext(CreateProfileContext);
    
    useEffect(() => {
      console.log(nextDisabled)
    
    }, [nextDisabled])
    

    const nextStep = (e) => {
        e.preventDefault();
        setScrollDirection(true);
        let val = checkoutStep;
        val++;
        updateCheckoutStep(val);
    };

    const prevStep = (e) => {
        e.preventDefault();
        setScrollDirection(false);
        let val = checkoutStep;
        val--;
        updateCheckoutStep(val);
    };

    const indicatorOpts = [
        { value: 'identityInformation', label: 'Identity Information' },
        { value: 'descriptionInformation', label: 'Description Information' },
        { value: 'nft', label: 'NFT' },
        { value: 'profileCreated', label: 'Profile Created' },
    ];

    return (
        <div id='RD-createProfileRoot' className="relative">
            <div
                id='RD-createProfileBody'
                className="h-full w-full pt-40 pb-72 pl-10 pr-10 bg-theme-bg-dark"
            >
                <div className="relative m-auto w-4/5 select-none">
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
                    <div className="absolute -top-36 -right-0 select-none">
                        <div className='inline-flex'>
                            <div className={`pr-2 pl-2`}>
                                <ArrowUpButton
                                    onClick={prevStep}
                                    disabled={checkoutStep == 0}
                                />
                            </div>
                            <div className='pr-2 pl-2'>
                                <ArrowDownButton
                                    onClick={nextStep}
                                    disabled={checkoutStep >= checkoutStepList.length - 1}
                                />
                            </div>
                        </div>
                    </div>
                    <CreateProfileIndicator
                        step={checkoutStep}
                        stepList={checkoutStepList}
                        indicatorOpts={indicatorOpts}
                    />
                </div>
            </div>
        </div>
    )
};

export default CheckoutWrapper;