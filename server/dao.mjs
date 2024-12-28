import { db } from './db.mjs';

export const getChallengesById = (activity_id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM challenges WHERE activity_id = ?';

    db.all(query, [activity_id], (err, rows) => {
      if (err) {
        reject(err); 
      } else if (rows.length === 0) {
        resolve({ error: "No challenges found." });
      } else {
        resolve(rows);
      }
    });
  });
};
