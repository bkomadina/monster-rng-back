import { config } from 'dotenv';
import helmet from 'helmet';
import express, { json } from 'express';
import monstersRoutes from './routes/monsters.mjs';

config();

const app = express();
const port = process.env.PORT || 3000;

app.use(json());
app.use(helmet());
app.use(monstersRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
