const SERVER_URL = 'http://localhost:3001';

// Activities
const getActivities = async () => {
    const response = await fetch(SERVER_URL + '/api/activities');
    if(response.ok) {
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
        if(response.ok) {
            const lastChoiceJson = await response.json();
            return lastChoiceJson;
        }
        else 
            throw new Error('Internal Server Error');
        }

const API = { getActivities, insertActivity, getLastChoice };
export default API;