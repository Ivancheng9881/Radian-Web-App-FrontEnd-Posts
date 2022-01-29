import { create } from 'ipfs-http-client';
import { ipfsContentRoot, ipfsNodeUrl } from '../../../commons/web3';
import axios from "axios";


async function initIpfs() {
    return await create(ipfsNodeUrl);
};

async function uploadContent(content) {
    const ipfs = await initIpfs();
    console.log('Init upload content!', ipfs)
    try {
        if (content !== undefined) {
            const { cid } = await ipfs.add(content, { "pin": true });
            console.log('cid added', cid);
            return cid;
        }
    } catch (err) {
        console.log('Error in uploading content', err)
        return err;
    }

};

function getContentUrl(cid) {
    return `${ipfsContentRoot}${cid}`
}

async function getContentJson(cid) {
    // console.log('getContentJson', cid)
    try {
        if (cid !== undefined) {
            let resp = await axios.get(getContentUrl(cid));
            console.log('axios-get-contentUrl', resp)
            return resp.data
        }

    } catch (err) {
        console.log('Error in getting contentJson', err)
        return err;
    }
}

const ipfsUtils = {
    initIpfs,
    uploadContent,
    getContentUrl,
    getContentJson
};

export default ipfsUtils;