import getProvider from '../provider';
import redis from '../redis';
import config from '../../config';
import url from 'url';

const namespace = 'ens';

const getName = async (addr: string) => {
    const provider = await getProvider();
    const name = await provider.lookupAddress(addr) || '';
    if (name) {
        await redis.set(`${namespace}-name2Addr-${name}`, addr);
    }
    await redis.set(`${namespace}-addr2Name-${addr}`, name);
    return name;
}

const getAddress = async (name: string) => {
    const provider = await getProvider();
    const addr = await provider.resolveName(url.domainToUnicode(name)) || '';
    if (addr) {
        await redis.set(`${namespace}-addr2Name-${addr}`, name);
    }
    await redis.set(`${namespace}-name2Addr-${name}`, addr);
    return addr;
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
