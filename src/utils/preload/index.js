import config from "../../commons/config";

const walletIconList = () => {
    return [
        `${config.assets.cdn}/metamask.png`,
        `${config.assets.cdn}/phantom.png`
    ]
}

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