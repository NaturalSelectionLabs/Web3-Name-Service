import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';

import NameInfo from './routes/name';
import AddressInfo from './routes/address';

import Header from './middleware/header';

import logger from './utils/logger';

process.on('uncaughtException', (e) => {
    logger.error('uncaughtException: ' + e);
});

const app = new Koa();

app.on('error', (err, ctx) => {
    logger.error('server error', err, ctx);
    ctx.body = {
        error: 'Server error.',
    };
});

app.use(Header);
app.use(cors());

// router
const router = new Router();

router.get('/name/:name', NameInfo);
router.get('/address/:address', AddressInfo);

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
