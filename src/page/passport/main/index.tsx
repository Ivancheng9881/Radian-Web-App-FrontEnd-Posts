import { Button, Layout, Typography } from "antd";
import { FC, useContext } from "react";
import DefaultFooter from "../../../components/Footer";
import RadianPassport from "../../../components/Passport";
import UserContext from "../../../utils/user/context/user.context";
import LandingSection from "../../landing/components/Section.components";


const PassportOverviewPage : FC = () => {

    const userContext = useContext(UserContext);

    return (
        <>
            <Layout.Content>
                <LandingSection />
                <div style={{zIndex: 1001, position: 'relative'}}>
                    <div className="rd-section" style={{marginTop: 80}}>
                        <RadianPassport profile={userContext.profile} clickable/>
                    </div>
                    <div className="rd-section" style={{textAlign: 'center'}}>
                        <Typography.Title level={4} className='rd-typo-marginless' >Welcome</Typography.Title>
                        <Typography.Title level={1} className='rd-typo-marginless' >RADIAN Identity</Typography.Title>
                        <div className="rd-typo-bounding" style={{width: 600, margin: 'auto'}} >
                            <Typography.Text className="rd-typo-desc" >
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lacus, pharetra nunc aliquam sem ut sed tincidunt. Neque tristique risus egestas condimentum integer odio. Eget vitae congue amet duis sed eget. Viverra feugiat amet tortor, nunc id turpis .
                            </Typography.Text>
                        </div>
                        <br/>
                        <Button type="primary" size="large" shape="round" >Social Now</Button>
                    </div>
                    <div className="rd-section" style={{textAlign: 'center'}}>
                        <Typography.Title level={4} className='rd-typo-marginless' >Meet our</Typography.Title>
                        <Typography.Title level={1} className='rd-typo-marginless' >Social Community</Typography.Title>
                        <div className="rd-typo-bounding" style={{width: 600, margin: 'auto'}} >
                            <Typography.Text className="rd-typo-desc" >
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lacus, pharetra nunc aliquam sem ut sed tincidunt. Neque tristique risus egestas condimentum integer odio. Eget vitae congue amet duis sed eget. Viverra feugiat amet tortor, nunc id turpis .
                            </Typography.Text>
                        </div>
                        <br/>
                        <Button type="primary" size="large" shape="round" >Find friends</Button>
                    </div>
                    <DefaultFooter disableGutter={true} />
                </div>
            </Layout.Content>
        </>
    )
};

export default PassportOverviewPage;