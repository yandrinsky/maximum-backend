"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = require("express");
const mainRouter = (0, express_1.Router)();
exports.mainRouter = mainRouter;
const pageItemsLimit = 20;
mainRouter.get('/get-car', async (req, resp) => {
    const { model, page = 1, mark } = req.body;
    const findObject = {};
    if (mark) {
        findObject.mark = mark;
    }
    if (model) {
        findObject.model = model;
    }
    const data = await req.app.locals.collection
        .find(findObject)
        .skip(10 * (page - 1))
        .limit(pageItemsLimit)
        .toArray();
    resp.json({
        data
    }).status(200);
});
mainRouter.get('/marks-aggregate', async (req, resp) => {
    const pipeline = [{ $group: { _id: '$mark', count: { $sum: 1 } } }];
    const data = await req.app.locals.collection.aggregate(pipeline).toArray();
    resp.json(data).status(200);
});
mainRouter.get('/models-aggregate', async (req, resp) => {
    const { mark } = req.body;
    const pipeline = [{ $match: { mark } }, { $group: { _id: '$model' } }];
    const data = await req.app.locals.collection.aggregate(pipeline).toArray();
    resp.json(data).status(200);
});
mainRouter.get('/pages-aggregate', async (req, resp) => {
    const { mark, model } = req.body;
    const findObject = {};
    if (mark) {
        findObject.mark = mark;
    }
    if (model) {
        findObject.model = model;
    }
    const pipeline = [{ $count: 'elements' }];
    if (model || mark) {
        pipeline.push({ $match: model ? { mark, model } : { mark } });
    }
    const data = await req.app.locals.collection.aggregate(pipeline).toArray();
    resp.json({ pages: Math.ceil(data[0].elements / pageItemsLimit) }).status(200);
});
