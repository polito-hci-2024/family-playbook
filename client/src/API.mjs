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
const API = { getActivities, getCharacters, getCharactersById };
export default API;

