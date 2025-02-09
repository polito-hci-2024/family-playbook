import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { getActivities, getLastChoice, getQuestionAnswer, getStepsById, getUserName, insertActivity, insertAnswer, getStoryById, insertReviews, insertUser, getChallengesById, getOtherChallengesById, getUserChallenges, insertUserChallenge } from './dao.mjs';
import { getCharacters } from './character-dao.mjs';

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

app.get('/api/questionAnswer/:question_id', async (req, res) => { 
  try {
    const question_id = req.params.question_id;  
    const questionAnswer = await getQuestionAnswer(question_id);  
    res.status(200).json(questionAnswer);
  } catch (error) {
    console.error(error);  
    res.status(500).end();
  }
});

app.post('/api/insertAnswer', async (req, res) => {
  const { answerId, question_id } = req.body; 

  try {
    const column = `answer${question_id}`;
    const result = await insertAnswer(answerId, column);

    res.status(200).json(result);
  } catch (error) {
    console.error('Error inserting answer:', error);
    res.status(500).send('Internal server error');
  }
});

app.get('/api/steps/:step_id', async (req, res) => { 
  try {
    const step_id = req.params.step_id; 
    const steps = await getStepsById(step_id); 
    if (steps) {
      res.status(200).json(steps); 
    } else {
      res.status(404).json({ error: 'Step not found' }); 
    }
  } catch (error) {
    console.error(error); 
    res.status(500).end(); 
  }
});

app.get('/api/story/:activity_id/:story_id', async (req, res) => { 
  try {
    const story_id = req.params.story_id; 
    const activity_id = req.params.activity_id; 
    const story = await getStoryById(activity_id, story_id); 
    if (story) {
      res.status(200).json(story); 
    } else {
      res.status(404).json({ error: 'Story not found' });
    }
  } catch (error) {
    console.error(error); 
    res.status(500).end(); 
  }
});

/*CHARACTERS*/

// - GET `/api/characters`
app.get('/api/characters', async (req, res) => {

  try {
    const characters_array = await getCharacters();
    if (characters_array.error)
      res.status(404).json(characters_array)
    else
      res.status(200).json(characters_array);
  } catch {
    res.status(500).end();
  }
});

/*REVIEWS*/

app.post('/api/review', async (req, res) => {
  const review_form = req.body; 

  try {
    const result = await insertReviews(review_form);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error inserting review:', error);
    res.status(500).send('Internal server error');
  }
});

app.post('/api/user', async (req, res) => {
  const user = req.body; 

  try {
    const userId = await insertUser(user);

    res.status(200).json(userId);
  } catch (error) {
    console.error('Error inserting user:', error);
    res.status(500).send('Internal server error');
  }
});

// - GET `/api/challenges`
app.get('/api/challenges/:activity_id', async (req, res) => {
  const activity_id = req.params.activity_id;
  try {
    const challenges = await getChallengesById(activity_id);
    res.status(200).json(challenges);
  } catch {
    res.status(500).end();
  }
});

app.get('/api/other-challenges/:activity_id', async (req, res) => {
  const activity_id = req.params.activity_id;
  try {
    const challenges = await getOtherChallengesById(activity_id);
    res.status(200).json(challenges);
  } catch {
    res.status(500).end();
  }
});

app.post('/api/user-challenge', async (req, res) => {
  const { user_id, challenge_id } = req.body; 

  try {
    const lastID = await insertUserChallenge(user_id, challenge_id);

    res.status(200).json({ user_challenge_id: lastID });
  } catch (error) {
    console.error('Error inserting user challenge:', error);
    res.status(500).send('Internal server error');
  }
});


app.get('/api/map/:user_id', async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const users_challenges = await getUserChallenges(user_id);
    res.status(200).json(users_challenges);
  } catch {
    res.status(500).end();
  }
});

// avvio del server
app.listen(port, () => {
  'API server started';
});