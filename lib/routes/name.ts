import type Koa from 'koa';
import RNS from '../utils/services/rns';
import ENS from '../utils/services/ens';

export default async (ctx: Koa.Context) => {
    const name: string = ctx.params.name.replace(/\.rss3$/, '');
    const service = name.split('.')[1];

    let address;
    let rnsName: string | null = null;
    let ensName: string | null = null;
    switch (service) {
        case undefined:
            rnsName = name;
            address = await RNS.name2Addr(rnsName);
            address && (ensName = await ENS.addr2Name(address));
            break;
        case 'eth':
            ensName = name;
            address = await ENS.name2Addr(ensName);
            address && (rnsName = await RNS.addr2Name(address));
            break;
    }

    ctx.body = {
        rnsName,
        ensName,
        address,
    };
};
