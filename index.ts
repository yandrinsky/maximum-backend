import express from 'express';
import cors from 'cors';
import { mainRouter } from './api/routes/main-router/main-router';
import { MongoClient } from 'mongodb';

const app = express();

const port = process.env.PORT ?? 3001;
const mongoURL = process.env.MONGO_URL ?? '';

app.use(cors({ origin: process.env.FRONT_PROD_URL, credentials: true }));
app.use(express.json());

app.use(mainRouter);

const client = new MongoClient(mongoURL);

app.listen(port, async () => {
    await client.connect();

    const db = await client.db('hrTest');

    app.locals.collection = db.collection('stock');

    console.log(`App listening on port ${port}`);
});
