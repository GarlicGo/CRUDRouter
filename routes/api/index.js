const Router = require('koa-router');
const CRUDRouter = require('../../modules/CRUDRouter');

const router = new Router();

const CRUDApiTestDb = require('../../db/CRUDApiTestDb');

router
    // 该接口仅用于验证token是否过期
    .get('/', async ctx => {
        // 该路由用于验查用户身份
        const clientIp = ctx.ips[0];
        const clientToken = ctx.headers.authorization.split(' ')[1];
        console.log();
        ctx.type = 'json';
        ctx.body = {
            status: 200,
            timestamp: new Date().getTime()
        };
    })
    .use('/at', new CRUDRouter(CRUDApiTestDb, 'api-test').getRoutes())

module.exports = router.routes();