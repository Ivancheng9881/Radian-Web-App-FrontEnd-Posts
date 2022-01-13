import { useContext, useEffect } from "react";
import { getQuery } from "../../../utils/query";
import CreateProfileContext from "../context/profile.context";
import CreateProfileCheckoutController from "./CheckoutController.components";


const CreateProfileCheckout = (props) => {

    const { updateCheckoutStep } = useContext(CreateProfileContext)

    useEffect(() => {
        let query = getQuery(props.history.location.search);
        if (query?.step) {
            updateCheckoutStep(query.step)
        }
    }, [])

    return (
        <CreateProfileCheckoutController />
    )

};


export default CreateProfileCheckout;