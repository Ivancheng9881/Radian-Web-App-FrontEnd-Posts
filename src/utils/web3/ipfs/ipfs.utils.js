import { create } from 'ipfs-http-client';
import { ipfsCDNRoot, ipfsCloudFrontRoot, ipfsContentRoot, ipfsNodeUrl } from '../../../commons/web3';
import axios from "axios";


async function initIpfs() {
    return await create(ipfsNodeUrl);
};

async function uploadContent(content) {
    const ipfs = await initIpfs();
    // console.log('Init upload content!', ipfs)
    try {
        if (content !== undefined) {
            const { cid } = await ipfs.add(content, { "pin": true });
            // console.log('cid added', cid);
            return cid;
        }
    } catch (err) {
        console.log('Error in uploading content', err)
        return err;
    }

};

function getBkgdImageFromCDNFailover (cid) {
    let edge = `url(${getMediaFromCDN(cid)})`
    let cachedServer = `url(${getMediaUrl(cid, true)})`;
    return `${edge}, ${cachedServer}`
}

function getImageFromCDNFailover(cid) {
    let edge = getMediaFromCDN(cid);
    let cachedServer = getMediaUrl(cid, true);
    return [
        edge,
        cachedServer,
    ]
}

function getMediaFromCDN(cid) {
    return `${ipfsCloudFrontRoot}${cid}`
};

function getMediaUrl(cid, readonly=true) {
    return `${getContentUrl(cid, false, true)}?objectType=media`
}

function getContentUrl(cid, readonly=true, isMedia=false) {
    return `${readonly ? ipfsCloudFrontRoot : ipfsCDNRoot }${cid}`
}

async function getContentJsonFallover(cid) {
    try {
        let url = getContentUrl(cid, true)
        console.log('trying to fetch cdn')
        let resp = await axios.get(url);
        if (resp) {
            return resp;
        }
        
    } catch(err) {
        console.log(err);
        let url = getContentUrl(cid, false);
        let resp = await axios.get(url);
        console.log(resp);
        return resp
    }
}



async function getContentJson(cid, readonly=true) {
    try {
        if (cid !== undefined) {
            let resp = await getContentJsonFallover(cid);
            console.log(resp)
            return resp.data;
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
    getMediaFromCDN,
    getBkgdImageFromCDNFailover,
    getImageFromCDNFailover,
    getMediaUrl,
    getContentJson
};

export default ipfsUtils;