import type Koa from 'koa';
import RNS from '../services/rns';
import ENS from '../services/ens';

export default async (ctx: Koa.Context) => {
    const address = ctx.params.address;

    const rnsName = await RNS.addr2Name(address);
    const ensName = await ENS.addr2Name(address);

    ctx.body = {
        rnsName,
        ensName,
        address,
    };
};
