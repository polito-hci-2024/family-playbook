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

    db.run(query, [activity_id, user_id], function (err) {
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
export const getLastUser = () => {
  return new Promise((resolve, reject) => {
    const query = `
        SELECT user_id 
        FROM users
        ORDER BY user_id DESC 
        LIMIT 1
      `;

    db.get(query, [], (err, row) => {
      if (err) {
        reject(err);
      } else if (!row) { // Se non c'è nessun risultato
        resolve(null); // Nessun utente trovato, restituisce null
      } else {
        resolve(row.user_id); // Restituisce il solo ID dell'utente
      }
    });
  });
};


export const getQuestionAnswer = (question_id) => {
  return new Promise((resolve, reject) => {
    const query = `
        SELECT 
          q.question_id, 
          q.question,
          q.image_url AS question_image_url,
          q.description,
          a1.answer_id AS answer1_id,
          a2.answer_id AS answer2_id,
          a3.answer_id AS answer3_id,
          a1.answer AS answer1, 
          a2.answer AS answer2, 
          a3.answer AS answer3,
          a1.title_answer AS title_answer1, 
          a2.title_answer AS title_answer2, 
          a3.title_answer AS title_answer3,
          a1.image_url AS a1_image_url,
          a2.image_url AS a2_image_url,
          a3.image_url AS a3_image_url
        FROM questions q
        LEFT JOIN answers a1 ON q.answer1_id = a1.answer_id
        LEFT JOIN answers a2 ON q.answer2_id = a2.answer_id
        LEFT JOIN answers a3 ON q.answer3_id = a3.answer_id
        WHERE q.question_id = ? 
      `;

    db.all(query, [question_id], (err, rows) => {
      if (err) {
        reject(err);
      } else if (rows.length === 0) {  // Se non ci sono risultati
        resolve({ error: "No questions found." });
      } else {
        console.log(rows);
        resolve(rows);  // Restituisce un array di oggetti
      }
    });
  });
};

export const insertAnswer = async (answer_id, answer_column) => {
  try {
    const user_id = await getLastUser(); // Ottieni l'ID dell'utente

    if (!user_id) {
      throw new Error('No user found');
    }

    // Prova a fare l'UPDATE
    const updateQuery = `
        UPDATE user_answers
        SET ${answer_column}_id = ?
        WHERE user_id = ?
      `;

    // Esegui l'UPDATE
    return new Promise((resolve, reject) => {
      db.run(updateQuery, [answer_id, user_id], function (err) {
        if (err) {
          reject(err);
        } else if (this.changes === 0) {
          // Se l'UPDATE non ha fatto nulla (nessuna riga trovata), inserisci una nuova riga
          const insertQuery = `
              INSERT INTO user_answers (user_id, ${answer_column}_id)
              VALUES (?, ?)
            `;
          db.run(insertQuery, [user_id, answer_id], function (err) {
            if (err) {
              reject(err);
            } else {
              resolve({ success: true, lastID: this.lastID });
            }
          });
        } else {
          // Se l'UPDATE ha avuto successo, risolvi
          resolve({ success: true });
        }
      });
    });
  } catch (err) {
    throw new Error(`Error inserting/updating answer: ${err.message}`);
  }
};

export const getStepsById = (step_id) => {
  return new Promise((resolve, reject) => {
    const query = `
        SELECT step_id, panel_number, step_name, description, image_url
        FROM steps
        WHERE step_id = ?
        ORDER BY panel_number ASC
      `;

    db.all(query, [step_id], (err, rows) => {
      if (err) {
        reject(err); // Gestione degli errori della query
      } else if (rows.length === 0) {
        resolve(null); // Nessun risultato trovato, restituisce null
      } else {
        resolve(rows); // Restituisce tutti i record trovati come array di oggetti
      }
    });
  });
};

export const getStoryById = (activity_id, story_id) => {
  return new Promise((resolve, reject) => {
    const query = `
        SELECT *
        FROM story
        WHERE activity_id = ? AND story_id = ?
        ORDER BY panel_number ASC
      `;

    db.all(query, [activity_id, story_id], (err, rows) => {
      if (err) {
        reject(err); // Gestione degli errori della query
      } else if (rows.length === 0) {
        resolve(null); // Nessun risultato trovato, restituisce null
      } else {
        resolve(rows); // Restituisce tutti i record trovati come array di oggetti
      }
    });
  });
};

export const insertReviews = (review_form) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO reviews (rating, review) VALUES (?, ?)';
    db.run(query, [review_form.rating, review_form.review], function (err) {
      if (err)
        reject(err);
      else
        resolve(this.lastID);
    });
  })
};


