import getProvider from '../provider';
import redis from '../redis';
import config from '../../config';

const provider = getProvider();

export default {
    async addr2Name(addr: string) {
        let name = await redis.get(`ens-addr2Name-${addr}`);
        if (name) {
            return name;
        } else {
            const name = await provider.lookupAddress(addr);
            if (name) {
                await redis.set(`ens-addr2Name-${addr}`, name, config.redis.ensExat);
                await redis.set(`ens-name2Addr-${name}`, addr, config.redis.ensExat);
                return name;
            }
        }
        return null;
    },
    async name2Addr(name: string) {
        let addr = await redis.get(`ens-name2Addr-${name}`);
        if (addr) {
            return addr;
        } else {
            addr = await provider.resolveName(name);
            if (addr) {
                await redis.set(`ens-name2Addr-${name}`, addr, config.redis.ensExat);
                await redis.set(`ens-addr2Name-${addr}`, name, config.redis.ensExat);
                return addr;
            }
        }
        return null;
    },
};
