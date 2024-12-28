const SERVER_URL = 'http://localhost:3001';

// INSERIRE FETCH
const getChallengesById = async () => {
  const response = await fetch(SERVER_URL + '/api/challenges');
  if(response.ok) {
      const challengesJson = await response.json();
      return challengesJson;
  }
  else 
      throw new Error('Internal Server Error');
}

const API = { getChallengesById };
export default API;