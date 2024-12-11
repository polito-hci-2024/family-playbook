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
const API = { getActivities };
export default API;