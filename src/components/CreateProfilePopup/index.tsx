import { Button, Modal, Steps } from "antd";
import { FC, useState, useContext, useEffect } from "react";
import { FixLater } from "../../schema/helper.interface";
import CreateProfilePopupBodySolana from "./solana";
import CreateProfilePopupPolygon from "./polygon";

export interface CreateProfilePopupPropsType {
    open: boolean,
    setOpen: FixLater,
    network: string,
    cid: FixLater,
    gasless?: boolean,
}

const CreateProfilePopup : FC<CreateProfilePopupPropsType> = (props) => {

    const handleCancel = () => props.setOpen(false);

    return (
        <Modal 
            className="rd-popup-root"
            visible={props.open} 
            footer={null}
            title={`Create profile on ${props.network}`}
            onCancel={handleCancel}
        >
            {props.network == 'solana' && <CreateProfilePopupBodySolana {...props} />}
            {props.network == 'polygon' && <CreateProfilePopupPolygon {...props} />}
        </Modal>
    )
};

export default CreateProfilePopup;