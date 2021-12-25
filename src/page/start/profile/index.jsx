import CreateProfileProvider from "./context/profile.provider";
import CreateProfileController from "./components/StepController";

const CreateProfilePage = (props) => {

    return (
        <CreateProfileProvider>
            <div>
                <CreateProfileController />
            </div>
        </CreateProfileProvider>
    )
};

export default CreateProfilePage;