const CONFIG = require('./config');
const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const cors = require('koa2-cors');
const Router = require('koa-router');
const koaBody = require('koa-body');
const static = require('koa-static');
const koaJwt = require('koa-jwt')({ secret: CONFIG.TOKEN_SECRET }); // 参数对象指定token密钥

// 子路由
const api = require('./routes/api');

const app = new Koa({
    proxy: true, // 信任代理
    proxyIpHeader: 'X-Real-IP' // 将XFF的首元素设为X-Real-IP (前提需代理服务nginx声明X-Real-IP并赋值为$remote_addr)
});
const router = new Router();

app
    .use(async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            if (err.status == 401) {
                ctx.type = 'json';
                ctx.body = {
                    status: 401,
                    timestamp: new Date().getTime()
                }
            } else {
                // 发送错误信号
                ctx.app.emit("error", err, ctx);
            }
        }
    })
    // 允许跨域
    .use(cors())
    .use(koaBody({
        multipart: true,
        formidable: {
            // 设置上传文件大小最大限制，默认2M
            maxFieldsSize: 50*1024*1024,
            // 保持文件的后缀
            keepExtensions: true,
        }
    }))

// 配置路由
router
    .get('/', async ctx => {
        ctx.type = 'html';
        ctx.body = fs.createReadStream('./public/index.html');
    })
    .use('/api', koaJwt, api)

// 应用路由
app
    .use(router.routes())
    .use(router.allowedMethods())
    // 静态资源服务中间件，放在路由应用后以免与路由冲突
    .use(static(path.join(__dirname, './public')))
    
    // 监听全局错误
    .on("error", (err, ctx) => {
        console.log(err.message ,new Date());
    });

// 启动服务
app.listen(3000);

