import express from 'express';
import morgan from 'morgan';
import {body, check, validationResult} from 'express-validator';
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

// avvio del server
app.listen(port, () => {'API server started';
});