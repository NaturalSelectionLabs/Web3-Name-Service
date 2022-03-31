import type Koa from 'koa';
import RNS from '../utils/services/rns';
import ENS from '../utils/services/ens';
import DAS from '../utils/services/das';
import { utils } from 'ethers/lib';

export default async (ctx: Koa.Context) => {
    let name: string = ctx.params.name;
    const nameSplits = name.split('.');
    const tld = nameSplits.length > 1 ? nameSplits.pop() : undefined; // Get the TLD(Top Level Domain)

    let address;
    let rnsName: string | null = null;
    let ensName: string | null = null;
    let dasName: string | null = null;
    switch (tld) {
        case undefined:
            name += '.rss3';
        case 'rss3':
            rnsName = name;
            address = await RNS.name2Addr(rnsName);
            break;
        case 'eth':
            ensName = name;
            address = await ENS.name2Addr(ensName);
            break;
        case 'bit':
            dasName = name;
            address = await DAS.name2Addr(dasName);
            break;
    }
    if (address) {
        address = utils.getAddress(address);
        if (!rnsName) {
            rnsName = await RNS.addr2Name(address);
        }
        if (!ensName) {
            ensName = await ENS.addr2Name(address);
        }
        if (!dasName) {
            dasName = await DAS.addr2Name(address);
        }
    }

    ctx.body = {
        rnsName,
        ensName,
        dasName,
        address,
    };
};
