import config from '../config';
import Redis from 'ioredis';
import logger from './logger';

const redisClient = new Redis(config.redis.url);

const stat = { available: false };

redisClient.on('error', (error: any) => {
    stat.available = false;
    logger.error('Redis error: ', error);
});
redisClient.on('end', () => {
    stat.available = false;
});
redisClient.on('connect', () => {
    stat.available = true;
    logger.info('Redis connected.');
});

export default {
    get: async (key: string) => {
        let value = await redisClient.get(key);
        return value;
    },
    set: (key: string, value: string, maxAge?: number) => {
        if (maxAge) {
            return redisClient.set(key, value, 'EX', maxAge);
        } else {
            return redisClient.set(key, value);
        }
    },
};
