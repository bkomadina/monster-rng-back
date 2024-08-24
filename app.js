const dotenv = require('dotenv');
const helmet = require('helmet');
const express = require('express');
const monstersRoutes = require('./routes/monsters');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to the database'));

app.use(express.json());
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
