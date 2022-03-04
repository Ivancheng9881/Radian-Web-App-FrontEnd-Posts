import { useContext, useEffect } from "react";
import { getQuery } from "../../../utils/query";
import CreateProfileContext from "../context/profile/profile.context";
import CreateProfileController from "./components/StepController";

const CreateProfilePage = (props) => {

    const { updateStep } = useContext(CreateProfileContext)

    useEffect(() => {
        let query = getQuery(props.history.location.search);
        console.log('CreateProfilePage-steps:', query)
        if (query?.step) {
            updateStep(query.step)
        }
    }, [])

    return (
        <CreateProfileController />
    )
};

export default CreateProfilePage;