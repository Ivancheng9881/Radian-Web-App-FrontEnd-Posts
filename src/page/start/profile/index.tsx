import { FC, useContext, useEffect } from "react";
import { RouterProps, useHistory } from "react-router";
import { getQuery } from "../../../utils/query";
import CreateProfileContext from "../context/profile/profile.context";
import CreateProfileController from "./components/StepController";

const CreateProfilePage: FC = () => {

    const { updateStep } = useContext(CreateProfileContext);
    const history = useHistory<History>();

    useEffect(() => {
        let query = getQuery(history.location.search);
        if (query?.step) {
            updateStep(query.step)
        }
    }, [])

    return (
        <CreateProfileController />
    )
};

export default CreateProfilePage;