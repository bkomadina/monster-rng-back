import sql from './db.mjs';

async function insertMonster({ name, HP, damage, difficulty }) {
  try {
    const result = await sql`
      INSERT INTO monsters (name, HP, damage, difficulty)
      VALUES (${name}, ${HP}, ${damage}, ${difficulty})
      RETURNING *;
    `;
    return result;
  } catch (error) {
    console.error('Error inserting monster:', error);
    throw error;
  }
}

export default insertMonster