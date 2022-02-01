

const walletIconList = () => {
    return [
        '/logos/metamask.png',
        '/logos/phantom.png',   
    ]
}

// const cacheImg = async () => {

// }

export const preloadWalletIcon = async () => {

    const promises = await walletIconList().map((src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve();
            img.onerror = reject();
        })
    });

    await Promise.all(promises)
}