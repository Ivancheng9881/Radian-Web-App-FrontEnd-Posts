import { Button, Checkbox, Col, message, Row, Spin, Typography } from "antd";
import { FC, useContext, useState } from "react";
import CreateProfilePopup from "../../../components/CreateProfilePopup";
import SignupContext from "../context/signup.context";
import { ISignupContext } from "../type";
import ProfileContractUtils from "../../../utils/web3/contract/profileContract/utils";
import { FullProfile } from "../../../schema/profile/profile.interface";
import { createProfileErc } from "../../../utils/web3/contract/profileContract/erc";

const SignupSummaryAction : FC = () => {

    // context
    const {info, publicNft, publicToken} : ISignupContext = useContext(SignupContext);

    // state
    const [ tnc, setTnc ] = useState<boolean>(false);
    const [ identityCid, setIdentityCid ] = useState();
    const [ loading, setLoading ] = useState<boolean>(false);

    const handleClick = async () => {
        createIdentity();
    };

    const createIdentity = async () => {
        setLoading(true);
        let identityJson: FullProfile = {
            ...info,
            nft: publicNft,
            token: publicToken
        };
        const cid = await ProfileContractUtils.createProfileCid(identityJson)
        setIdentityCid(cid);
        createProfileTx(cid);
    };

    const createProfileTx = async (cid: any) => {
        console.log(createProfileTx);
        try {
            const txn = await createProfileErc(cid.toString(), false);
            console.log(txn)
            if (txn) {
                const isSuccess = await txn.wait();
                console.log(isSuccess)
                if (isSuccess) createProfileSuccess()
            }
        } catch (error: any) {
            console.log(error)
            setLoading(false);
            message.warn(error.message)
        }
    };

    const createProfileSuccess = async () => {
        setLoading(false);
        message.info('passport created');
    }

    return (
        <>
            <div style={{textAlign: 'center', marginBottom: 20}}>
                <Checkbox checked={tnc} onChange={e => setTnc(e.target.checked)} >
                    <Typography.Text strong className="rd-typo-reverse">I accept terms and condition</Typography.Text>
                </Checkbox>
            </div>
            <div style={{margin: 'auto', width: 'min-content'}}>
                <Spin spinning={loading}>
                    <Button 
                        className="rd-btn-light"
                        type="primary"
                        shape="round"
                        size="large"
                        disabled={!tnc}
                        onClick={handleClick}
                    >
                        Register
                    </Button>
                </Spin>
            </div>
        </>

    )
};

export default SignupSummaryAction;