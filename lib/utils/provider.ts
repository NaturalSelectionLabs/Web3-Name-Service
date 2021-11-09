import { ethers } from 'ethers';
import config from '../config';
import got from 'got';
import logger from '../utils/logger';

let idNo = 0;

async function checkInfuraID(id: string) {
    try {
        const res = await got.post(`https://mainnet.infura.io/v3/${id}`, {
            json: {
                jsonrpc: '2.0',
                id: 1,
                method: 'eth_accounts',
                params: [],
            }
        });
        if (res) {
            return true;
        }
    } catch (e) {
        logger.error(e);
    }
    return false;
}

(async () => {
    const poolSize = config.infuraId.length;
    const idStart = Math.floor(Math.random() * poolSize);
    for (let i = 0; i < poolSize; i++) {
        if (await checkInfuraID(config.infuraId[(idStart + i) % poolSize])) {
            idNo = (idStart + i) % poolSize;
            break;
        }
    }
})();

const providers: {
    [key: string]: ethers.providers.InfuraProvider;
} = {};

export default function getProvider(network = 'homestead') {
    if (!providers[network]) {
        providers[network] = new ethers.providers.InfuraProvider(network, {
            projectId: config.infuraId[idNo],
        });
    }
    return providers[network];
}