import type Koa from 'koa';
import RNS from '../utils/services/rns';
import ENS from '../utils/services/ens';

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
