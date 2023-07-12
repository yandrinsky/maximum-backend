import mongoose from 'mongoose';

export interface IStockBD {
    mark: string;
    model: string;
    engine: {
        power: string;
        volume: string;
        transmission: string;
        fuel: string;
    };
    drive: string;
    equipmentName: string;
    price: string;
    createdAt: Date;
}

const stockSchema = new mongoose.Schema<IStockBD>({
    mark: String, // Марка
    model: String, // Модель
    engine: {
        power: Number, // Мощность
        volume: Number, // Объем
        transmission: String, // КПП,
        fuel: String // Топливо
    },
    drive: String,
    equipmentName: String, // Название комплектации
    price: Number, // Стоимость
    createdAt: Date // Дата создания
});

export const Stock = mongoose.model('Stock', stockSchema);
