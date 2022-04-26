import { FC, useContext, useEffect, useState } from "react";
import NFTUtils from "../../../utils/nft";
import { INFTList } from '../../../components/NftGrid/index.d';
import NftGridView from "../../../components/NftGrid/components/Grid.components";
import RadianInput from "../../../components/RadianForm";
import { handleNftMapping } from "./nft.controller";
import { ISignupContext, NftGridRootProps } from "../type";
import SignupContext from "../context/signup.context";

const NftEth : FC<NftGridRootProps> = (props) => {
    const { address, publicListUpdate, publicListUpdateAll } = props;

    const PAGE_SIZE = 20;
    const NETWORK = 'eth';
    const TOKEN_VISIBILITY_OPTIONS = [
        { label: 'All Public', value: 1 },
        { label: 'All Private', value: 0 }
    ];

    // context 
    const { publicNft }: ISignupContext = useContext(SignupContext);

    const [ data, setData ] = useState<INFTList>({
        cursor: '',
        page: 0,
        page_size: 0,
        result: [],
        status: '',
        total: 0,
        offset: 0,
        limit: PAGE_SIZE,
    });
    const [ buffering, setBuffering ] = useState<boolean>(true);

    const fetchNftData = async () => {
        try {
            let networks = [
                {network: NETWORK, offset: data.offset, limit: data.limit},
            ] 
            let response = await NFTUtils.erc.getData(address, networks);
            let mappedData = await handleNftMapping(response.data[NETWORK].result, publicNft[NETWORK]);
            response.data[NETWORK].result = mappedData;
            setData({
                ...response,
                ...response.data[NETWORK],
                offset: data.offset + PAGE_SIZE,
            });
            setBuffering(false);

        } catch(err) {
            console.log(err);
        }
    };

    const handleFetchNext = async () => {
        setBuffering(true);

        try {
            let networkBody: any = {
                network: NETWORK,
                offset: data.offset,
                limit: PAGE_SIZE,
            };

            let response = await NFTUtils.erc.getData(address, [networkBody]);
            let newData = await handleNftMapping(response.data[NETWORK].result);
            
            setData({
                ...data,
                ...response.data[NETWORK],
                result: [...data.result, ...newData],
                offset: data.offset + PAGE_SIZE,
            })
            setBuffering(false);

        } catch(err) {
            console.log(err);
        }
    };

    const handleVisToggle = async (id: number) : Promise<void> => {
        let _result = data.result;
        let newVis = !_result[id].visible
        _result[id].visible = newVis;
        setData({
            ...data,
            result: _result
        });
        publicListUpdate(NETWORK, _result[id], newVis);
    };

    const _computeNewVisibility = (input: number) : boolean => {
        if (input === 1) {
            return true;
        } else if (input === 0) {
            return false
        };
    }

    const handleAllVisChange = (e: any) => {
        let visibility: boolean = _computeNewVisibility(e.target.value);
        let _result = data.result.map((d) => {
            d.visible = visibility;
            return d;
        })
        setData({ ...data, result: _result });
        publicListUpdateAll(NETWORK, visibility, _result)
    }


    useEffect(() => {
        if (address) {
            fetchNftData();
        }
    }, [address])

    return (
        <div className="rd-flexbox rd-flexbox-full rd-flexbox-vertical">
            <div className="rd-align-right">
                <RadianInput.Radio 
                    size="large"
                    defaultValue={0}
                    onChange={handleAllVisChange}
                    options={TOKEN_VISIBILITY_OPTIONS}                                    
                />
            </div>
            <br/>
            <NftGridView 
                data={data.result} 
                handleFetchNext={handleFetchNext}
                buffering={buffering}
                {...props}
                actionHandler={handleVisToggle}
                visibleKey='visible'
            />
        </div>
    )
};

export type { INFTList };
export default NftEth;