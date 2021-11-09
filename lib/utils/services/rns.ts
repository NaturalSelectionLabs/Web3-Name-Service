import { ethers } from 'ethers';
import config from '../../config';
import { utils } from 'ethers/lib';
import getProvider from '../provider';

async function callRNSContract<T>(
    method: string,
    ...args: any
): Promise<T> {
    const provider = getProvider(config.rns.test ? 'ropsten' : 'homestead');

    const contract = await new ethers.Contract(
        getRNSContract(),
        config.rns.contract.resolver,
        provider,
    );
    return contract[method](...args);
}

function getRNSContract() {
    if (config.rns.test) {
        return config.rns.contractNetworks.ropsten.resolver;
    } else {
        return config.rns.contractNetworks.mainnet.resolver;
    }
}

// sha3HexAddress https://eips.ethereum.org/EIPS/eip-181
function sha3HexAddress(addr: string) {
    addr = '00' + addr.slice(2);
    const lookup = '3031323334353637383961626364656600000000000000000000000000000000';
    let res = '';
    for (let i = 40; i > 0; i--) {
        const bit = Number('0x' + addr.slice(i, i + 2)) & 0xf;
        res = lookup.slice(2 * bit, 2 * bit + 2) + res;
    }
    return utils.keccak256('0x' + res);
}

const addrCache: {
    [key: string]: string;
} = {};

export default {
    async addr2Name(addr: string) {
        const reverseNode = '0x91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e2';
        const addrHex = sha3HexAddress(addr.toLowerCase());
        const node = utils.keccak256(utils.defaultAbiCoder.encode(['bytes32', 'bytes32'], [reverseNode, addrHex]));
        const name = (await callRNSContract<string>('name', node))
            .toLowerCase()
            .replace(config.rns.suffix, '');
        if (name) {
            addrCache[addr] = name;
        }
        return name || null;
    },
    async name2Addr(name: string) {
        name = (name + config.rns.suffix).toLowerCase();
        const addr = await callRNSContract<string>('addr', utils.namehash(name));
        return addr;
    },
};
