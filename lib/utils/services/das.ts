import Das from 'das-sdk';
import logger from '../logger';
import redis from '../redis';
import config from '../../config';

export default {
    async addr2Name(addr: string) {
        try {
            const name = await redis.get(`das-addr2Name-${addr}`);
            if (name) {
                return name;
            }
        }
        catch (e) {
            logger.error(e);
        }

        try {
            const das = new Das({
                url: config.das.apiUrl,
            });
            const name = await das.reverseRecord({
                type: 'blockchain',
                key_info: {
                    coin_type: '60', // '60' for ETH
                    chain_id: '1', // '1' for ETH
                    key: addr
                }
            });
            if (name) {
                await redis.set(`das-addr2Name-${addr}`, name, config.redis.ensExat);
                await redis.set(`das-name2Addr-${name}`, addr, config.redis.ensExat);
                return name;
            }
            else {
                return null;
            }
        }
        catch (e) {
            logger.error(e);
            return null;
        }
    },
    async name2Addr(name: string) {
        try {
            const addr = await redis.get(`das-name2Addr-${name}`);
            if (addr) {
                return addr;
            }
        }
        catch (e) {
            logger.error(e);
        }

        try {
            const das = new Das({
                url: config.das.apiUrl,
            });
            const accountInfo = await das.account(name);
            if (accountInfo && (accountInfo.owner_algorithm_id === 3 || accountInfo.owner_algorithm_id === 5)) {
                await redis.set(`das-name2Addr-${name}`, accountInfo.owner_key, config.redis.ensExat);
                return accountInfo.owner_key;
            }
            else {
                return null;
            }
        }
        catch (e) {
            logger.error(e);
            return null;
        }
    },
};
