import sql from './db.js';

async function deleteMonster(id) {
  try {
    const result = await sql`
      DELETE FROM monsters
      WHERE id = ${id}
      RETURNING *;
    `;
    return result;
  } catch (error) {
    console.error('Error deleting monster:', error);
    throw error;
  }
}

export default deleteMonster;