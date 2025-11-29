import express from 'express';
import statusRouter from './routes/status.routes';

const app = express();

app.use(express.json());
app.use('/api/status', statusRouter);

export default app;

