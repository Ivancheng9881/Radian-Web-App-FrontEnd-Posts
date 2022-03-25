import { FC, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { getQuery } from "../../../utils/query";
import CreateProfileContext from "../context/profile/profile.context";
import CreateProfileCheckoutController from "./CheckoutController.components";


const CreateProfileCheckout : FC = () => {

    const { updateCheckoutStep } = useContext(CreateProfileContext)
    const history = useHistory<History>();
    
    useEffect(() => {
        let query = getQuery(history.location.search);
        if (query?.step) {
            updateCheckoutStep(query.step)
        }
    }, [])

    return (
        <CreateProfileCheckoutController />
    )

};


export default CreateProfileCheckout;