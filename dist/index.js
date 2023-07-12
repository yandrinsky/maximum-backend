"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const main_router_1 = require("./api/routes/main-router/main-router");
const mongodb_1 = require("mongodb");
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3001;
const mongoURL = (_b = process.env.MONGO_URL) !== null && _b !== void 0 ? _b : '';
app.use((0, cors_1.default)({ origin: process.env.FRONT_PROD_URL, credentials: true }));
app.use(express_1.default.json());
app.use(main_router_1.mainRouter);
const client = new mongodb_1.MongoClient(mongoURL);
app.listen(port, async () => {
    await client.connect();
    const db = await client.db('hrTest');
    app.locals.collection = db.collection('stock');
    console.log(`App listening on port ${port}`);
});
