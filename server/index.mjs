import express from 'express';
import morgan from 'morgan';
import {getChallengesById} from "./dao.mjs";
import cors from 'cors';

// init express
const app = express();
const port = 3001;

//middleware
app.use(express.json());
app.use(morgan('dev'));
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
  credentials: true //abilita i cookie cross-origin
};
app.use(cors(corsOptions));

/* ROUTE */
// - GET `/api/challenges`
app.get('/api/challenges', async (req, res) => {

  try {
    const challenges = await getChallengesById();
    res.status(200).json(challenges);
  } catch {
    res.status(500).end();
  }
});

// avvio del server
app.listen(port, () => {'API server started';
});