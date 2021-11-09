import type Koa from 'koa';
import RNS from '../services/rns';
import ENS from '../services/ens';

export default async (ctx: Koa.Context) => {
    const name = ctx.params.name.replace(/\.rss3$/, '');
    const service = name.split('.')[1];

    let address;
    let rnsName;
    let ensName;
    switch (service) {
        case undefined:
            rnsName = name;
            address = await RNS.name2Addr(rnsName);
            ensName = await ENS.addr2Name(address);
            break;
        case 'eth':
            ensName = name;
            address = await ENS.name2Addr(ensName);
            rnsName = await RNS.addr2Name(address);
            break;
    }

    ctx.body = {
        rnsName,
        ensName,
        address,
    };
};
