import { ethers } from 'ethers';
import getProvider from '../provider';

const provider = getProvider();

export default {
    async addr2Name(addr: string) {
        const name = await provider.lookupAddress(addr);
        return name;
    },
    async name2Addr(name: string) {
        const address = await provider.resolveName(name);
        return address;
    },
};
