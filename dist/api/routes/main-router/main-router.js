"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = require("express");
const mainRouter = (0, express_1.Router)();
exports.mainRouter = mainRouter;
const pageItemsLimit = 20;
mainRouter.post('/get-car', async (req, resp) => {
    const { model, page = 1, mark } = req.body;
    let findOptions = [];
    if (model === null || model === void 0 ? void 0 : model.length) {
        findOptions.push(['model', { $in: model }]);
    }
    if (mark === null || mark === void 0 ? void 0 : mark.length) {
        findOptions.push(['mark', { $in: mark }]);
    }
    try {
        const data = await req.app.locals.collection
            .find(Object.fromEntries(findOptions))
            .skip(pageItemsLimit * (page - 1))
            .limit(pageItemsLimit)
            .toArray();
        resp.json(data).status(200);
    }
    catch (e) {
        resp.json([]).status(200);
    }
});
mainRouter.get('/marks-aggregate', async (req, resp) => {
    const pipeline = [{ $group: { _id: '$mark', count: { $sum: 1 } } }];
    const data = await req.app.locals.collection.aggregate(pipeline).toArray();
    resp.status(200).json(data);
});
mainRouter.post('/models-aggregate', async (req, resp) => {
    const { mark } = req.body;
    const pipeline = [
        {
            $match: {
                mark: {
                    $in: mark
                }
            }
        },
        { $group: { _id: '$model' } }
    ];
    // //Todo delete thiss
    // return resp.send(pipeline);
    const data = await req.app.locals.collection.aggregate(pipeline).toArray();
    resp.status(200).json(data);
});
mainRouter.post('/pages-aggregate', async (req, resp) => {
    const { mark, model } = req.body;
    const pipeline = [{ $count: 'elements' }];
    let match = [];
    if (model === null || model === void 0 ? void 0 : model.length) {
        match.push(['model', { $in: model }]);
    }
    if (mark === null || mark === void 0 ? void 0 : mark.length) {
        match.push(['mark', { $in: mark }]);
    }
    if (match.length) {
        pipeline.unshift({ $match: Object.fromEntries(match) });
    }
    const data = await req.app.locals.collection.aggregate(pipeline).toArray();
    try {
        resp.json({ pages: Math.ceil(data[0].elements / pageItemsLimit) }).status(200);
    }
    catch (e) {
        resp.json({ pages: 1 }).status(200);
    }
});
