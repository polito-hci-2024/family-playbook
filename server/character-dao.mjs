/* Data Access Object (DAO) module for accessing characters */
import { db } from './db.mjs';

/**GET ALL CHARACTERS */
export const getCharacters = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM characters';
        db.all(sql, [], (err, rows) => {
            if (err)
                reject(err);
            else {
                const characters_array = rows.map((c) => ({ character_id: c.character_id, name: c.name, theme: c.theme, image_url: c.image_url }));
                resolve(characters_array);
            }
        })
    })
}

/**GET A CHARACTER BY ID */
export const getCharactersById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM characters WHERE character_id=?';
        db.get(sql, [id], (err, row) => {
            if (err)
                reject(err);
            else if (row === undefined)
                resolve({ error: "Character not available, check the inserted id." });
            else {
                resolve(new Character(row.character_id, row.name, row.theme, row.image_url));
            }
        })
    })
}