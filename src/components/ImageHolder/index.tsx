import { FC, useEffect } from 'react';

import { useImage } from 'react-image';
import ipfsUtils from '../../utils/web3/ipfs/ipfs.utils';


interface ComponentProps {
    cid: string,
    alt?: string,
}

const ImageHolder : FC<ComponentProps> = ({cid, alt}) => {

    const { src, isLoading } = useImage({
        srcList: ipfsUtils.getImageFromCDNFailover(cid),
        useSuspense: false,
    });

    return <img src={src} alt={alt} />
};

export default ImageHolder;