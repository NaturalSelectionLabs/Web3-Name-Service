import { ethers } from 'ethers';
import config from '../config';
import got from 'got';
import logger from '../utils/logger';

async function checkJsonRPCEndpoint(url: string) {
    try {
        const res = await got.post(url, {
            json: {
                jsonrpc: '2.0',
                id: 1,
                method: 'eth_accounts',
                params: [],
            },
        });
        if (res) {
            return true;
        }
    } catch (e) {
        logger.error(e);
    }
    return false;
}

async function checkInfuraID(id: string) {
    return checkJsonRPCEndpoint(`https://mainnet.infura.io/v3/${id}`);
}

async function getInfuraIdNo() {
    let idNo = 0;
    const poolSize = config.infuraId.length;
    const idStart = Math.floor(Math.random() * poolSize);
    for (let i = 0; i < poolSize; i++) {
        const j = (idStart + i) % poolSize;
        if (await checkInfuraID(config.infuraId[j])) {
            idNo = j;
            return idNo;
        }
    }
    logger.error('No available infura id found, using idNo=0');
    return idNo;
}

const providers: {
    [key: string]: ethers.providers.InfuraProvider;
} = {};
const ourMainnetJsonRPCProvider = new ethers.providers.JsonRpcProvider(config.jsonRPCUrl, 'homestead');

export default async function getProvider(network = 'homestead') {
    if (network === 'homestead' && await checkJsonRPCEndpoint(config.jsonRPCUrl)) {
        return ourMainnetJsonRPCProvider;
    } else {
        const idNo = await getInfuraIdNo();
        const KEY = `${network}-${idNo}`;
        if (!providers[KEY]) {
            providers[KEY] = new ethers.providers.InfuraProvider(network, {
                projectId: config.infuraId[idNo],
            });
        }
        return providers[KEY];
    }
}
