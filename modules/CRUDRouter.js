const assert = require('assert');
const ObjectId = require('mongodb').ObjectId;
const Router = require('koa-router');

class CRUDRouter {

    constructor (db, collectionName) {
        this.db = db;
        this.collectionName = collectionName;
        this.routes = new Router()
            .post('/', async ctx => {
                let returnData = null;
                const payload = ctx.request.body;
                try {
                    switch (payload.mode) {
                        case undefined:
                        case "single":
                            assert.ok(payload.doc!=undefined, "doc must be defined");
                            assert.equal(Object.prototype.toString.call(payload.doc), '[object Object]', "doc must be an Object");
                            await this.db.insertOne(
                                this.collectionName,
                                payload.doc,
                                payload.options==undefined?{}:payload.options
                            ).then(res => {
                                returnData = {
                                    status: 201,
                                    result: res.result,
                                    target: res.ops[0]
                                }
                            })
                            break;
                        case "multiple":
                            assert.ok(payload.docs!=undefined, "docs must be defined");
                            assert.equal(Object.prototype.toString.call(payload.docs), '[object Array]', "docs must be an Array");
                            await this.db.insertMany(
                                this.collectionName,
                                payload.docs,
                                payload.options==undefined?{}:payload.options
                            ).then(res => {
                                returnData = {
                                    status: 201,
                                    result: res.result,
                                    targets: res.ops
                                }
                            })
                            break;
                        default:
                            assert.fail("Invalid val of mode");
                    }
                } catch (err) {
                    switch (err.name) {
                        case "AssertionError [ERR_ASSERTION]":
                            returnData = {
                                status: 400,
                                errMsg: err.message
                            }
                            break;
                        default:
                            returnData = {
                                status: 500,
                                errMsg: err.message
                            }
                    }
                }
                ctx.type = 'json';
                ctx.body = returnData;
            })
            .delete('/:id', async ctx => {
                let returnData = null;
                const id = ctx.params.id;
                try {
                    await this.db.deleteOne(
                        this.collectionName,
                        {_id: ObjectId(id)}
                    ).then(res => {
                        returnData = {
                            status: 200,
                            result: res.result
                        }
                    });
                } catch (err) {
                    returnData = {
                        status: 500,
                        errMsg: err.message
                    }
                }
                ctx.type = 'json';
                ctx.body = returnData;
            })
            .put('/', async ctx => {
                let returnData = null;
                const payload = ctx.request.body;
                try {
                    assert.ok(payload.update!=undefined, "update must be defined");
                    assert.equal(Object.prototype.toString.call(payload.update), '[object Object]', "update must be an Object");
                    switch (payload.mode) {
                        case undefined:
                        case "single":
                            await this.db.updateOne(
                                this.collectionName,
                                payload.filter==undefined?{}:payload.filter,
                                {$set: payload.update},
                                payload.options==undefined?{}:payload.options
                            ).then(res => {
                                returnData = {
                                    status: 200,
                                    result: res.result
                                }
                            })
                            break;
                        case "multiple":
                            await this.db.updateMany(
                                this.collectionName,
                                payload.filter==undefined?{}:payload.filter,
                                {$set: payload.update},
                                payload.options==undefined?{}:payload.options
                            ).then(res => {
                                returnData = {
                                    status: 200,
                                    result: res.result
                                }
                            })
                            break;
                        default:
                    }
                } catch (err) {
                    switch (err.name) {
                        case "AssertionError [ERR_ASSERTION]":
                            returnData = {
                                status: 400,
                                errMsg: err.message
                            }
                            break;
                        default:
                            returnData = {
                                status: 500,
                                errMsg: err.message
                            }
                    }
                }
                ctx.type = 'json';
                ctx.body = returnData;
            })
            .put('/:id', async ctx => {
                let returnData = null;
                const id = ctx.params.id;
                const payload = ctx.request.body;
                try {
                    assert.ok(payload.update!=undefined, "update must be defined");
                    assert.equal(Object.prototype.toString.call(payload.update), '[object Object]', "update must be an Object");
                    await this.db.updateOne(
                        this.collectionName,
                        {_id: ObjectId(id)},
                        {$set: payload.update},
                        payload.options==undefined?{}:payload.options
                    ).then(res => {
                        returnData = {
                            status: 200,
                            result: res.result
                        }
                    })
                } catch (err) {
                    switch (err.name) {
                        case "AssertionError [ERR_ASSERTION]":
                            returnData = {
                                status: 400,
                                errMsg: err.message
                            }
                            break;
                        default:
                            returnData = {
                                status: 500,
                                errMsg: err.message
                            }
                    }
                }
                ctx.type = 'json';
                ctx.body = returnData;
            })
            .get('/', async ctx => {
                let returnData = null;
                const payload = ctx.request.query;
                try {
                    await this.db.find(
                        this.collectionName,
                        payload.filter==undefined?{}:JSON.parse(payload.filter),
                        payload.projection==undefined?{}:JSON.parse(payload.projection)
                    ).then(res => {
                        returnData = {
                            status: 200,
                            docs: res
                        };
                    })
                } catch (err) {
                    switch (err.name) {
                        case "SyntaxError":
                            returnData = {
                                status: 400,
                                errMsg: err.message
                            }
                            break;
                        default:
                            returnData = {
                                status: 500,
                                errMsg: err.message
                            }
                    }
                }
                ctx.type = 'json';
                ctx.body = returnData;
            })
            .get('/:id', async ctx => {
                let returnData = null;
                const id = ctx.params.id;
                const payload = ctx.request.query;
                try {
                    await this.db.find(
                        this.collectionName,
                        {_id: ObjectId(id)},
                        payload.projection==undefined?{}:JSON.parse(payload.projection)
                    ).then(res => {
                        returnData = {
                            status: 200,
                            doc: (res.length==0)?null:res[0]
                        }
                    })
                } catch (err) {
                    switch (err.name) {
                        case "SyntaxError":
                            returnData = {
                                status: 400,
                                errMsg: err.message
                            }
                            break;
                        default:
                            returnData = {
                                status: 500,
                                errMsg: err.message
                            }
                    }
                }
                ctx.type = 'json';
                ctx.body = returnData;
            })
            .routes();
    }

    getRoutes () {
        return this.routes;
    }
}

module.exports = CRUDRouter;