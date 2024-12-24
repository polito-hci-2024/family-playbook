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
  
  export const getUserName = () => {
    return new Promise((resolve, reject) => {
      const query = `
  SELECT name 
  FROM users
  ORDER BY user_id DESC 
  LIMIT 1
`;
  
      db.get(query, [], (err, row) => {
        if (err) {          
          reject(err); 
        } else if (!row) { // Se non c'è nessun risultato
          resolve({ error: "No users found." });
        } else {
          console.log(row);
          resolve(row); // Restituisci il singolo oggetto
        }
      });
    });
  };

  export const getQuestionAnswer = () => { 
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          q.question_id, 
          q.question, 
          a1.answer AS answer1, 
          a2.answer AS answer2, 
          a3.answer AS answer3
        FROM questions q
        LEFT JOIN answers a1 ON q.answer1_id = a1.answer_id
        LEFT JOIN answers a2 ON q.answer2_id = a2.answer_id
        LEFT JOIN answers a3 ON q.answer3_id = a3.answer_id
      `;
  
      db.all(query, [], (err, rows) => { // Usiamo db.all per ottenere più righe
        if (err) {
          reject(err); 
        } else if (rows.length === 0) { // Se non ci sono risultati
          resolve({ error: "No questions found." });
        } else {
          console.log(rows);
          resolve(rows); // Restituisce un array di oggetti
        }
      });
    });
  };
  