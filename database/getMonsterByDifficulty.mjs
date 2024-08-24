import sql from './db.mjs';

async function getMonsterByDifficulty(difficulty) {
  try {
    const result = await sql`
      SELECT * FROM monsters
      WHERE difficulty = ${difficulty}
      ORDER BY RANDOM()
      LIMIT 1;
    `;
    return result;
  } catch (error) {
    console.error('Error retrieving monster:', error);
    throw error;
  }
}

export default getMonsterByDifficulty;
