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

  