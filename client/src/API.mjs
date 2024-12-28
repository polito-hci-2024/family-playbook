const SERVER_URL = 'http://localhost:3001';

// INSERIRE FETCH
const getChallengesById = async (activity_id) => {
  const response = await fetch(SERVER_URL + '/api/challenges/${activity_id}');
  if(response.ok) {
      const challengesJson = await response.json();
      return challengesJson;
  }
  else 
      throw new Error('Internal Server Error');
}

const API = { getChallengesById };
export default API;