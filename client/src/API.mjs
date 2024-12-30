const SERVER_URL = 'http://localhost:3001';

// Activities
const getActivities = async () => {
  const response = await fetch(SERVER_URL + '/api/activities');
  if (response.ok) {
    const activitiesJson = await response.json();
    return activitiesJson;
  }
  else
    throw new Error('Internal Server Error');
}

const insertActivity = async (userId, activityId) => {
  try {
    const response = await fetch(SERVER_URL + '/api/insert-activity', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        activity_id: activityId,
      }),
    });

    if (response.ok) {
      return await response.json(); // Se necessario, puoi restituire i dati che il backend invia
    } else {
      throw new Error('Failed to insert activity');
    }
  } catch (error) {
    console.error('Error in insertActivity:', error);
    throw error; //Rilancia l'errore per poterlo gestire nel chiamante
  }
};

const getLastChoice = async () => {
  const response = await fetch(SERVER_URL + '/api/start-activity');
  if (response.ok) {
    const lastChoiceJson = await response.json();
    return lastChoiceJson;
  }
  else
    throw new Error('Internal Server Error');
}

const getUserName = async () => {
  const response = await fetch(SERVER_URL + '/api/userName');
  if (response.ok) {
    const userNameJson = await response.json();
    return userNameJson;
  }
  else
    throw new Error('Internal Server Error');
}

const getQuestionAnswer = async (question_id) => {
  const response = await fetch(`${SERVER_URL}/api/questionAnswer/${question_id}`); // Usa il valore di question_id dinamicamente
  if (response.ok) {
    const questionAnswerJson = await response.json();
    return questionAnswerJson;
  } else {
    throw new Error('Internal Server Error');
  }
};

const insertAnswer = async (answerId, question_id) => {
  try {
    const response = await fetch(`${SERVER_URL}/api/insertAnswer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Assicurati di inviare JSON
      },
      body: JSON.stringify({ answerId, question_id }), // Passa i dati nel body
    });

    if (response.ok) {
      const data = await response.json(); // Ottieni la risposta del server
      return data;
    } else {
      throw new Error('Error while inserting answer');
    }
  } catch (error) {
    console.error('Error inserting answer:', error);
    throw error;
  }
};

const getStepsById = async (stepId) => {
  try {
    const response = await fetch(SERVER_URL + `/api/steps/${stepId}`);
    if (response.ok) {
      const stepsJson = await response.json();
      return stepsJson; // Restituisce i dati ottenuti dall'API
    } else {
      throw new Error(`Failed to fetch steps for step_id ${stepId}: ${response.statusText}`);
    }
  } catch (error) {
    console.error(error); // Log degli errori per facilitare il debug
    throw error; // Propaga l'errore per gestirlo a livello superiore
  }
};

const getStoryById = async (activityId, storyId) => {
  try {
    const response = await fetch(SERVER_URL + `/api/story/${activityId}/${storyId}`);
    if (response.ok) {
      const storyJson = await response.json();
      return storyJson; // Restituisce i dati ottenuti dall'API
    } else {
      throw new Error(`Failed to fetch story for story_id ${storyId}: ${response.statusText}`);
    }
  } catch (error) {
    console.error(error); // Log degli errori per facilitare il debug
    throw error; // Propaga l'errore per gestirlo a livello superiore
  }
};



//Characters
const getCharacters = async () => {
  const response = await fetch(SERVER_URL + '/api/characters');
  if (response.ok) {
    const charactersJson = await response.json();
    return charactersJson;
  }
  else
    throw new Error('Internal Server Error');
}

const getCharactersById = async () => {
  const response = await fetch(SERVER_URL + '/api/characterById');
  if (response.ok) {
    const characterJson = await response.json();
    return characterJson;
  }
  else
    throw new Error('Internal Server Error');
}

//Reviews
const insertReviews = async (review_form) => {
  const response = await fetch(`${SERVER_URL}/api/review`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review_form),
    credentials: 'include'
  });

  return response.json();
}

const API = { getActivities, insertActivity, getLastChoice, getUserName, getQuestionAnswer, insertAnswer, getStepsById, getStoryById, getCharacters, getCharactersById, insertReviews };
export default API;

