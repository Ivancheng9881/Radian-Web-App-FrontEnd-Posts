import { Button } from "antd";
import { FC } from "react"
import { useHistory, useLocation } from "react-router";
import { FullProfile } from "../../schema/profile/profile.interface";
import RadianPassportBase from "./base";
import { PASSPORT_ME_ROUTE, PASSPORT_ROUTE } from "../../commons/route";

interface PageProps {
    profile: FullProfile,
    clickable?: boolean
}

const RadianPassportMe: FC<PageProps> = (props) => {

    const history = useHistory();
    const location = useLocation();

    const routeToPassportMe = () => {
        let path = location.pathname === PASSPORT_ROUTE ? PASSPORT_ME_ROUTE : PASSPORT_ROUTE;
        history.push({
            pathname: path,
            state: {
                scrollTo: 'nft'
            }
        });
    }

    return (
        <RadianPassportBase {...props}>
            <Button onClick={routeToPassportMe} size="large" shape="round" type="primary" className="rd-btn-light" >
                {location.pathname === PASSPORT_ROUTE ? 'Assets' : 'Back'}
            </Button>
        </RadianPassportBase>
    )
};

export default RadianPassportMe;