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
    const query = 'UPDATE choices SET activity_id = ? WHERE user_id = ?';

    db.run(query, [activity_id, user_id], function (err) {
      if (err) {
        console.log(err);
        reject(err); 
      } else if (this.changes === 0) {
        resolve({ error: "No matching user_id found to update" });
      } else {
        resolve({ success: true, changes: this.changes }); 
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
      } else if (!row) { 
        resolve({ error: "No activities found." });
      } else {
        console.log(row);
        resolve(row); 
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
      } else if (!row) { 
        resolve({ error: "No users found." });
      } else {
        console.log(row);
        resolve(row); 
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
      } else if (!row) { 
        resolve(null); 
      } else {
        resolve(row.user_id); 
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
      } else if (rows.length === 0) {  
        resolve({ error: "No questions found." });
      } else {
        console.log(rows);
        resolve(rows);  
      }
    });
  });
};

export const insertAnswer = async (answer_id, answer_column) => {
  try {
    const user_id = await getLastUser(); 

    if (!user_id) {
      throw new Error('No user found');
    }

    const updateQuery = `
        UPDATE user_answers
        SET ${answer_column}_id = ?
        WHERE user_id = ?
      `;

    return new Promise((resolve, reject) => {
      db.run(updateQuery, [answer_id, user_id], function (err) {
        if (err) {
          reject(err);
        } else if (this.changes === 0) {
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
        reject(err); 
      } else if (rows.length === 0) {
        resolve(null); 
      } else {
        resolve(rows); 
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
        reject(err); 
      } else if (rows.length === 0) {
        resolve(null); 
      } else {
        resolve(rows); 
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

export const insertUser = (user) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO users (name, age, character_id)
      VALUES (?, ?, ?)
    `;
    db.run(query, [user.name, user.age, user.character_id], function (err) {
      if (err) {
        reject(err); 
      } else {
        resolve(this.lastID); 
      }
    });
  });
};


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

export const getOtherChallengesById = (activity_id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM challenges WHERE activity_id = ? AND challenge_id != 1';

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

export const insertUserChallenge = (user_id, challenge_id) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO users_challenges (user_id, challenge_id)
      VALUES (?, ?)
    `;
    db.run(query, [user_id, challenge_id], function (err) {
      if (err) {
        reject(err); 
      } else {
        resolve(this.lastID); 
      }
    });
  });
};

export const getUserChallenges = (user_id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT DISTINCT challenge_id
      FROM users_challenges
      WHERE user_id = ?
    `;
    db.all(query, [user_id], (err, rows) => {
      if (err) {
        reject(err); 
      } else {
        const challengeIds = rows.map(row => row.challenge_id); 
        resolve(challengeIds); 
      }
    });
  });
};

