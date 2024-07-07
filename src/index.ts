import express from 'express';
import connectDB from './config/database';
import config from './config/config';
import cors from 'cors';

const app = express();

connectDB();

// Cors
app.use(cors());
// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}/`);
});