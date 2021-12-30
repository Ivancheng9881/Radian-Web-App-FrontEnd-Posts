

export function truncateAddress(str, maxFigure=10) {
    if (str.length < maxFigure) return str;

    let pre, suf;
    let half = Math.floor(maxFigure / 2 );
    
    pre = str.slice(0, maxFigure - half);
    suf = str.slice(str.length - half - 1, str.length - 1)
        
    return `${pre}...${suf}`;
}