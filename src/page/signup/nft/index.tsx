import { Button, Col, Row, Select, Space, Tabs, Typography } from "antd";
import { FC, useState, useContext } from "react";
import { useHistory, useLocation } from "react-router";
import {  SIGNUP_PROPIC_ROUTE, SIGNUP_SUMMARY_ROUTE, SIGNUP_TOKEN_ROUTE } from "../../../commons/route";
import SignupAction from "../components/signupAction";
import SignupReturn from "../components/signupReturn";
import SignupFormWrapperFullWidth from "../components/signupFormWrapper/fullwidth";
import NftEth from "./eth.components";
import RadianInput from "../../../components/RadianForm";
import NftPolygon from "./polygon.components";
import { ISignupContext } from "../type";
import { INFTItem } from "../../../utils/nft/erc/index.d";
import SignupContext from "../context/signup.context";
import { findIndexFromItemList } from "./nft.controller";
import { SignupLocationState } from "../router";
import Web3Context from "../../../utils/web3/context/web3.context";
import CustomScrollbar from "../../../components/CustomScrollBar";

const SignupTokenPage : FC = () => {

    const NETWORK_OPTIONS = [
        { label: 'ethereum', value: 'ethereum' },
        { label: 'polygon', value: 'polygon' },
        // { label: 'solana', value: 'solana' }
    ]

    const history = useHistory();
    const location = useLocation<SignupLocationState>();
    const web3Context = useContext(Web3Context);
    const signupContext: ISignupContext = useContext(SignupContext);
    
    // const [ address, setAddress ] = useState<string>(web3Context.providers?.['metamask@erc']);
    const address = '0x8e79eF9e545Fa14e205D89970d50E7caA3456683'
    const [ currentNetwork, setCurrentNetwork ] = useState<string>('ethereum');

    const handleNextClick = () => {
        if (location.state?.fromSummary) {
            history.push(SIGNUP_SUMMARY_ROUTE)
        } else {
            history.push(SIGNUP_TOKEN_ROUTE)
        }
    };

    const handleReturnClick = () => {
        history.push(SIGNUP_PROPIC_ROUTE);
    };
    
    const handleNetworkChange = (val: string): void => {
        setCurrentNetwork(val)
    };

    const publicListUpdate = (
        network: string,
        item: INFTItem,
        visible: boolean
        ) : void => {
        let shouldUpdateState: boolean = false;
        let arr = signupContext.publicNft[network] || [];
        // first lookup if the item exists on the list;
        let itemIdx = findIndexFromItemList(arr, item);
        if (itemIdx === -1) {
            // item not existing in the array
            // do nothing if the new state is {!visible}
            // push item to the array if the new state is {visible}
            if (visible) {
                arr.push(item);
                shouldUpdateState = true;
            }
        } else if (itemIdx >= 0) {
            // item existing in the array
            // do nothing if the new state is {visible}
            // remove item if the new state is invisible
            if (!visible) {
                arr.splice(itemIdx, 1);
                shouldUpdateState = true;
            }
        }
        
        // set the updated array to the state
        if (shouldUpdateState) signupContext.setPublicNft({ ...signupContext.publicNft, [network]: arr });  
    };
    
    const publicListUpdateAll = (
        network: string,
        visible: boolean, 
        items?: INFTItem[]
        ): void => {
        let arr : INFTItem[] = visible ? items : [];
        signupContext.setPublicNft({ ...signupContext.publicNft, [network]: arr })
    }

    return (
        <div className="rd-signup-body">
            <div className="rd-signup-illustration rd-signup-illustration-blank"></div>
            <SignupFormWrapperFullWidth>
                <div className="rd-signup-form-root">
                    <SignupReturn onClick={handleReturnClick} />
                    <div className="rd-signup-card-root ">
                        <Row className="rd-signup-nft-network">
                            <Col lg={24} style={{textAlign: 'center'}} >
                                <Typography.Title level={3}>
                                    NFTs Assets
                                </Typography.Title>
                            </Col>
                            <Col lg={3} sm={4}>
                                <div className="rd-input-label-root">
                                    <RadianInput.Select 
                                        value={currentNetwork} 
                                        onChange={handleNetworkChange}
                                    >
                                        {NETWORK_OPTIONS.map((n) => {
                                            return (<Select.Option key={n.value} value={n.value} >
                                                {n.label}
                                            </Select.Option>)
                                        })}
                                    </RadianInput.Select>
                                </div>
                            </Col>
                        </Row>
                        <Tabs activeKey={currentNetwork} >
                            <Tabs.TabPane key='ethereum'>
                                <NftEth 
                                    address={address}
                                    mode='visibility'
                                    iconClx='rd-nft-action-icon rd-nft-action-icon-clickable rd-nft-action-icon-vis'
                                    publicListUpdate={publicListUpdate}
                                    publicListUpdateAll={publicListUpdateAll}
                                />
                            </Tabs.TabPane>
                            <Tabs.TabPane key='polygon'>
                                <NftPolygon 
                                    address={address}
                                    mode='visibility'
                                    iconClx='rd-nft-action-icon rd-nft-action-icon-clickable rd-nft-action-icon-vis'
                                    publicListUpdate={publicListUpdate}
                                    publicListUpdateAll={publicListUpdateAll}
                                />
                            </Tabs.TabPane>
                        </Tabs>
                    </div>
                    <SignupAction>
                        <Button 
                            className="rd-btn-light"
                            type="primary"
                            shape="round"
                            size="large"
                            onClick={handleNextClick}
                        >
                            Next
                        </Button>
                    </SignupAction>
                </div>
            </SignupFormWrapperFullWidth>
        </div>
    )
};

export default SignupTokenPage;