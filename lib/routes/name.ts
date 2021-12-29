import type Koa from 'koa';
import RNS from '../utils/services/rns';
import ENS from '../utils/services/ens';
import DAS from '../utils/services/das';
import { utils } from 'ethers/lib';

export default async (ctx: Koa.Context) => {
    let name: string = ctx.params.name;
    const service = name.split('.')[1];

    let address;
    let rnsName: string | null = null;
    let ensName: string | null = null;
    let dasName: string | null = null;
    switch (service) {
        case undefined:
            name += '.rss3';
        case 'rss3':
            rnsName = name;
            address = await RNS.name2Addr(rnsName);
            if (address) {
                address = utils.getAddress(address);
                ensName = await ENS.addr2Name(address);
            }
            break;
        case 'eth':
            ensName = name;
            address = await ENS.name2Addr(ensName);
            if (address) {
                address = utils.getAddress(address);
                rnsName = await RNS.addr2Name(address);
            }
            break;
        case 'bit':
            dasName = name;
            address = await DAS.name2Addr(dasName);
            break;
    }

    ctx.body = {
        rnsName,
        ensName,
        dasName,
        address,
    };
};
