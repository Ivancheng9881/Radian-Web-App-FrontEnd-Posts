import { useContext, useEffect } from "react";
import { getQuery } from "../../../utils/query";
import CreateProfileContext from "../context/profile.context";
import CreateProfileController from "./components/StepController";

const CreateProfilePage = (props) => {

    const { updateStep } = useContext(CreateProfileContext)

    useEffect(() => {
        let query = getQuery(props.history.location.search);
        if (query?.step) {
            updateStep(query.step)
        }
    }, [])

    return (
        <div>
            <CreateProfileController />
        </div>
    )
};

export default CreateProfilePage;