import { create } from 'ipfs-http-client';
import { ipfsContentRoot, ipfsNodeUrl } from '../../../commons/web3';
import axios from "axios";


async function initIpfs() {
    return await create(ipfsNodeUrl);
};

async function uploadContent(content) {
    const ipfs = await initIpfs();
    const { cid } = await ipfs.add(content, {"pin": true});
    console.log(cid);
    return cid
};

function getContentUrl(cid) {
    return `${ipfsContentRoot}${cid}`
}

async function getContentJson(cid) {
    try {
        let resp = await axios.get(getContentUrl(cid));
        console.log(resp)
        return resp.data
    } catch(err) {
        console.log(err)
    }
}

const ipfsUtils = {
    initIpfs,
    uploadContent,
    getContentUrl,
    getContentJson
};

export default ipfsUtils;