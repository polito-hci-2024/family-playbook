import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { getActivities, insertActivity } from './dao.mjs';

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
// - GET `/api/activities`
app.get('/api/activities', async (req, res) => {

  try {
    const activities = await getActivities();
    res.status(200).json(activities);
  } catch {
    res.status(500).end();
  }
});

app.put('/api/insert-activity', async (req, res) => {

  try {
    const result = await insertActivity(req.body.user_id, req.body.activity_id);
    res.status(200).json();
  } catch {
    res.status(500).end();
  }
});

// avvio del server
app.listen(port, () => {'API server started';
});