import sql from './db.js';

async function updateMonster(id, updates) {
  const { name, HP, damage, difficulty } = updates;
  try {
    const result = await sql`
      UPDATE monsters
      SET name = ${name}, HP = ${HP}, damage = ${damage}, difficulty = ${difficulty}
      WHERE id = ${id}
      RETURNING *;
    `;
    return result;
  } catch (error) {
    console.error('Error updating monster:', error);
    throw error;
  }
}

export default updateMonster;
