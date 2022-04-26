import { Col, Image, Row } from "antd";
import { FC, useContext } from "react";
import config from "../../../commons/config";
import RadianInput from "../../../components/RadianForm";
import ipfsUtils from "../../../utils/web3/ipfs/ipfs.utils";
import SignupContext from "../context/signup.context";
import { ISignupContext } from "../nft/type";


const SignupSummaryInfo : FC = () => {

    const { info } : ISignupContext = useContext(SignupContext);

    return (
        <Row>
            <Col lg={8} className="rd-propic" >
                <Image
                    width={300}
                    src={ipfsUtils.getContentUrl(info.profilePictureCid[0])} 
                    fallback={`${config.assets.cdn}/misc/propic_placeholder.png`}
                    preview={false}
                />
            </Col>
            <Col lg={16} >
                <Row gutter={[36, 36]} >
                    <Col lg={8} sm={8} >
                        <RadianInput.Label label='First Name' >
                            <RadianInput.Input value={info.firstName} disabled />
                        </RadianInput.Label>
                    </Col>
                    <Col lg={8} sm={8} >
                        <RadianInput.Label label='Last Name' >
                            <RadianInput.Input value={info.lastName} disabled />
                        </RadianInput.Label>
                    </Col>
                    <Col lg={8} sm={8} >
                        <RadianInput.Label label='Username' >
                            <RadianInput.Input value={info.username} disabled />
                        </RadianInput.Label>
                    </Col>
                    <Col lg={8} sm={8} >
                        <RadianInput.Label label='Located in' >
                            <RadianInput.Input value={info.location} disabled />
                        </RadianInput.Label>
                    </Col>
                    <Col lg={8} sm={8} >
                        <RadianInput.Label label='Religions' >
                            <RadianInput.Input value={info.religion} disabled />
                        </RadianInput.Label>
                    </Col>
                    <Col lg={8} sm={8} >
                        <RadianInput.Label label='Gender' >
                            <RadianInput.Input value={info.gender} disabled />
                        </RadianInput.Label>
                    </Col>
                    <Col lg={8} sm={8} >
                        <RadianInput.Label label='Nationality' >
                            <RadianInput.Input value={info.location} disabled />
                        </RadianInput.Label>
                    </Col>
                    <Col lg={8} sm={8} >
                        <RadianInput.Label label='Ethnicity' >
                            <RadianInput.Input value={info.religion} disabled />
                        </RadianInput.Label>
                    </Col>
                    <Col span={24}>
                        <RadianInput.Label label='Interest' >
                            <RadianInput.TagSelect value={info.tags} disabled />
                        </RadianInput.Label>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
};

export default SignupSummaryInfo;