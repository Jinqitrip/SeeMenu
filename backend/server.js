import express from 'express';
import cors from 'cors';
import menuRouter from './routes/menu.js';
import scanRouter from './routes/scan.js';
import roomsRouter from './routes/rooms.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/menu', menuRouter);
app.use('/api/scan', scanRouter);
app.use('/api/rooms', roomsRouter);

app.listen(PORT, () => {
  console.log(`SeeMenu backend running at http://localhost:${PORT}`);
});
