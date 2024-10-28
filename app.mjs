import { config } from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import express, { json } from 'express';
import monstersRoutes from './routes/monsters.mjs';

config();

const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  // Allowed origins
  origin: 'http://localhost:1234',
  methods: 'GET,POST',
};

app.use(cors(corsOptions));
app.use(json());
app.use(helmet());
app.use(monstersRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
