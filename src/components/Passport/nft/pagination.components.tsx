import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { FC } from "react";

interface NftPaginationActionProps {
    totalPage: number,
    currentPage: number,
    setCurrentPage(value: number): void;
}

const NftPaginationAction : FC<NftPaginationActionProps> = (props) => {
    const { totalPage, currentPage, setCurrentPage } = props;

    const handleNext = () => {
        setCurrentPage(currentPage+1);
    };

    const handlePrev = () => {
        setCurrentPage(currentPage-1);
    };

    return (
        <div className="rd-nft-page-action">
            <Button icon={<LeftOutlined />} shape='circle' onClick={handlePrev} disabled={currentPage===1} />
            Page {currentPage}/{totalPage}
            <Button icon={<RightOutlined />} shape='circle' onClick={handleNext} disabled={currentPage>=totalPage} />
        </div>
    )
};
export default NftPaginationAction