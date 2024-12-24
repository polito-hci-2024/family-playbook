import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { getActivities, getLastChoice, getQuestionAnswer, getStepsById, getUserName, insertActivity, insertAnswer } from './dao.mjs';

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
    if (result.error) {
      res.status(400).json({ error: result.error }); // In caso di errore, restituisci un errore 400
    } else {
      res.status(200).json({ success: true, message: 'Activity inserted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' }); // Restituisci un errore generico in caso di problemi
  }
});

// - GET `/api/activities`
app.get('/api/lastChoice', async (req, res) => {

  try {
    const lastChoice = await getLastChoice();
    res.status(200).json(lastChoice);
  } catch {
    res.status(500).end();
  }
});

// - GET `/api/activities`
app.get('/api/start-activity', async (req, res) => {

  try {
    const startActivity = await getLastChoice();
    res.status(200).json(startActivity);
  } catch {
    res.status(500).end();
  }
});

// - GET `/api/userName`
app.get('/api/userName', async (req, res) => {

  try {
    const userName = await getUserName();
    res.status(200).json(userName);
  } catch {
    res.status(500).end();
  }
});

app.get('/api/questionAnswer/:question_id', async (req, res) => { // Usa :question_id per il parametro dinamico
  try {
    const question_id = req.params.question_id;  // Estrai il parametro question_id
    const questionAnswer = await getQuestionAnswer(question_id);  // Passa question_id alla funzione
    res.status(200).json(questionAnswer);
  } catch (error) {
    console.error(error);  // Aggiungi per facilitare il debug
    res.status(500).end();
  }
});

app.post('/api/insertAnswer', async (req, res) => {
  const { answerId, question_id } = req.body; // Prendi i parametri dalla richiesta

  try {
    // Inserisci la risposta nel database utilizzando la colonna giusta
    const column = `answer${question_id}`;
    const result = await insertAnswer(answerId, column);

    res.status(200).json(result);
  } catch (error) {
    console.error('Error inserting answer:', error);
    res.status(500).send('Internal server error');
  }
});

app.get('/api/steps/:step_id', async (req, res) => { // Usa :step_id per il parametro dinamico
  try {
    const step_id = req.params.step_id; // Estrai il parametro step_id
    const steps = await getStepsById(step_id); // Usa la funzione DAO per ottenere i dati
    if (steps) {
      res.status(200).json(steps); // Restituisce i risultati come JSON
    } else {
      res.status(404).json({ error: 'Step not found' }); // Restituisce un errore 404 se non trova risultati
    }
  } catch (error) {
    console.error(error); // Log degli errori per il debug
    res.status(500).end(); // Errore generico del server
  }
});


// avvio del server
app.listen(port, () => {'API server started';
});