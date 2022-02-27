

const truncateAddress = (
    address: string, 
    maxFigure: number = 10
    ): string => {
    if (address.length < maxFigure) return address;

    let pre: string, 
        suf: string;
    let half: number = Math.floor(maxFigure / 2 );
    
    pre = address.slice(0, maxFigure - half);
    suf = address.slice(address.length - half - 1, address.length - 1)
        
    return `${pre}...${suf}`;
}

const encodeUint8Array = (text: string) : Uint8Array => new TextEncoder().encode(text);


export {
    truncateAddress,
    encodeUint8Array
}