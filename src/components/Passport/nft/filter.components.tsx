import { Select } from "antd";
import { FC } from "react";
import RadianInput from "../../RadianForm";

type supportedNetwork = 'eth' | 'polygon'

interface NftPaginationFilterProps {
    supportedNetwork?: supportedNetwork[],
    network?: string,
    setNetwork?(value: string): void,
}

const NftPaginationFilter : FC<NftPaginationFilterProps> = (props) => {
    const {
        supportedNetwork=['eth', 'polygon'],
        network,
        setNetwork
    } = props;

    return (
        <div className="rd-nft-filter-action">
            <RadianInput.Select value={network}  onChange={value => setNetwork(value)}>
                {supportedNetwork.map((o) => {
                    return <Select.Option value={o} key={`nft-page-filter-option-${o}`}>{o.toUpperCase()}</Select.Option>
                })}
            </RadianInput.Select>
        </div>
    )
};

export type { supportedNetwork, NftPaginationFilterProps}
export default NftPaginationFilter;