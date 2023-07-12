"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stock = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const stockSchema = new mongoose_1.default.Schema({
    mark: String,
    model: String,
    engine: {
        power: Number,
        volume: Number,
        transmission: String,
        fuel: String // Топливо
    },
    drive: String,
    equipmentName: String,
    price: Number,
    createdAt: Date // Дата создания
});
exports.Stock = mongoose_1.default.model('Stock', stockSchema);
