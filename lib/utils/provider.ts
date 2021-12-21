import { ethers } from 'ethers';
import config from '../config';
import got from 'got';
import logger from '../utils/logger';

async function checkInfuraID(id: string) {
    try {
        const res = await got.post(`https://mainnet.infura.io/v3/${id}`, {
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

export default async function getProvider(network = 'homestead') {
    const idNo = await getInfuraIdNo();
    const KEY = `${network}-${idNo}`;
    if (!providers[KEY]) {
        providers[KEY] = new ethers.providers.InfuraProvider(network, {
            projectId: config.infuraId[idNo],
        });
    }
    return providers[KEY];
}
