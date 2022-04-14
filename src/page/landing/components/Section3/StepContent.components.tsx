import { Typography } from "antd";
import { FC } from "react";

interface IContent {
    title: string
    subtitle: string,
    body: string
}

interface PageProps {
    content: IContent,
    isActive: boolean
}

const StepContent: FC<PageProps> = ({
    content,
    isActive
}) => {

    return (
        <div className={`rd-landing-orbit-content-animated ${isActive ? 'rd-active' : ''}`}>
            <Typography.Text className="rd-landing-orbit-text-animation rd-landing-orbit-title rd-landing-orbit-title-blue">
                {content.title}
            </Typography.Text>
            <Typography.Text className="rd-landing-orbit-text-animation rd-landing-orbit-title">
                {content.subtitle}
            </Typography.Text>
            <Typography.Text className="rd-landing-orbit-text-animation rd-landing-orbit-desc rd-typo-family-regular">
                {content.body}
            </Typography.Text>
        </div>
    )
};

export default StepContent;