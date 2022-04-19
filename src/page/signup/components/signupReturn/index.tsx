import { ArrowLeftOutlined } from "@ant-design/icons";
import { FC } from "react";

interface PageProps {
    disabled?: boolean,
    onClick?: () => void;
}

const SignupReturn : FC<PageProps> = ({
    onClick
}) => {
    return (
        <div className="rd-signup-return">
            <div>
                <ArrowLeftOutlined onClick={onClick} />
            </div>
        </div>
    )
};

export default SignupReturn;