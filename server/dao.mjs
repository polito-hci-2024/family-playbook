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
      // La query UPDATE per associare un activity_id a un user_id
      const query = 'UPDATE choices SET activity_id = ? WHERE user_id = ?';
    
      db.run(query, [activity_id, user_id], function(err) {
        if (err) {
          console.log(err);
          reject(err); // In caso di errore
        } else if (this.changes === 0) {
          // Se non è stata modificata nessuna riga, significa che non c'era nessun record con quel user_id
          resolve({ error: "No matching user_id found to update" });
        } else {
          resolve({ success: true, changes: this.changes }); // Restituisce il numero di righe modificate
        }
      });
    });
  };
  
  export const getLastChoice = () => {
    return new Promise((resolve, reject) => {
      const query = `
  SELECT A.* 
  FROM activities A 
  INNER JOIN choices C ON A.activity_id = C.activity_id 
  ORDER BY C.ROWID DESC 
  LIMIT 1
`;
  
      db.get(query, [], (err, row) => {
        if (err) {          
          reject(err); 
        } else if (!row) { // Se non c'è nessun risultato
          resolve({ error: "No activities found." });
        } else {
          console.log(row);
          resolve(row); // Restituisci il singolo oggetto
        }
      });
    });
  };
  
  