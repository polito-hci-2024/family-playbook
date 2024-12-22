import { db } from './db.mjs';

export const getActivities = () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM activities';
  
      db.all(query, [], (err, rows) => {
        if (err) {
          reject(err); 
        } else if (rows.length === 0) {
          resolve({ error: "No activities found." });
        } else {
          resolve(rows);
        }
      });
    });
  };

  export const insertActivity = (user_id, activity_id) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO choices (activity_id) VALUES (?) WHERE user_id = ?';  
  
      db.all(query, [activity_id, user_id], (err, rows) => {
        if (err) {
          reject(err); 
        } else if (rows.length === 0) {
          resolve({ error: "Error inserting activity" });
        } else {
          resolve(rows);
        }
      });
    });
  };

  
  