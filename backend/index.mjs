import express from 'express';
import routes from './routes/postRoutes.mjs';

const app = express();
const port = 3000;

import cors from 'cors';


app.use((req, res, next) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); // Allow the specified HTTP methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow the specified headers

  // Continue to the next middleware or route handler
  next();
});

app.use(cors({
  origin: ['http://127.0.0.1:8080/frontend/', 'localhost:3000']
}));

app.use(express.json());
app.use(routes);

import { connectDB } from './models/mongo-db.mjs';
connectDB();

app.get('/', (req, res) => {
  res.send("Welcome to the API");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
