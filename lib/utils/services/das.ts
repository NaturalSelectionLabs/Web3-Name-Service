import Das from 'das-sdk';
import redis from '../redis';
import config from '../../config';

const das = new Das({
    url: config.das.apiUrl,
});

const namespace = 'das';

const getName = async (addr: string) => {
    try {
        const name = await das.reverseRecord({
            type: 'blockchain',
            key_info: {
                coin_type: '60', // '60' for ETH
                chain_id: '1', // '1' for ETH
                key: addr
            }
        }) || '';
        if (name) {
            await redis.set(`${namespace}-name2Addr-${name}`, addr);
        }
        await redis.set(`${namespace}-addr2Name-${addr}`, name);
        return name;
    }
    catch (e) {
        await redis.set(`${namespace}-addr2Name-${addr}`, '');
        return '';
    }
}

const getAddress = async (name: string) => {
    try {
        const accountInfo = await das.account(name);
        // about owner_algorithm_id reference: https://github.com/DeAccountSystems/das-account-indexer/blob/main/API.md#get-account-basic-info
        if (accountInfo && (accountInfo.owner_algorithm_id === 3 || accountInfo.owner_algorithm_id === 5)) {
            await redis.set(`${namespace}-name2Addr-${name}`, accountInfo.owner_key);
            await redis.set(`${namespace}-addr2Name-${accountInfo.owner_key}`, name);
            return accountInfo.owner_key;
        }
        else {
            await redis.set(`${namespace}-name2Addr-${name}`, '');
            return '';
        }
    }
    catch (e) {
        await redis.set(`${namespace}-name2Addr-${name}`, '');
        return '';
    }
}

export default {
    async addr2Name(addr: string) {
        let name = await redis.get(`${namespace}-addr2Name-${addr}`);
        if (name !== null) {
            getName(addr);
            return name || null;
        } else {
            name = await getName(addr);
            if (name) {
                return name;
            }
        }
        return null;
    },
    async name2Addr(name: string) {
        let addr = await redis.get(`${namespace}-name2Addr-${name}`);
        if (addr !== null) {
            getAddress(name);
            return addr || null;
        } else {
            addr = await getAddress(name);
            if (addr) {
                return addr;
            }
        }
        return null;
    },
};
