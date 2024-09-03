import express from 'express';
import sql from '../database/db.mjs';

const router = express.Router();

const isDifficultyValid = (difficulty) => {
  return !difficulty ||
    (difficulty !== 'easy' && difficulty !== 'medium' && difficulty !== 'hard')
    ? false
    : true;
};

router.post('/add-monster', async (req, res) => {
  const { name, HP, damage, difficulty } = req.body;

  if (!name || !HP || !damage || !isDifficultyValid(difficulty)) {
    return res
      .status(404)
      .json({ message: 'All monster stats need to be provided' });
  }

  try {
    const result = await sql`
      INSERT INTO monstersschema.monsters (name, HP, damage, difficulty)
      VALUES (${name}, ${HP}, ${damage}, ${difficulty})
      RETURNING name, HP, damage
    `;
    res.status(201).json(result[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/monster/:difficulty', async (req, res) => {
  const difficulty = req.params.difficulty;

  if (!isDifficultyValid(difficulty)) {
    return res.status(404).json({ message: 'No such difficulty found' });
  }

  try {
    const result = await sql`
      SELECT * FROM monstersschema.monsters
      WHERE difficulty = ${difficulty}
      ORDER BY RANDOM()
      LIMIT 1
    `;

    if (!result || result.length === 0) {
      return res
        .status(404)
        .json({ message: 'No monsters found with the selected difficulty' });
    }
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/lastcreated/:id', async (req, res) => {
  const monsterId = req.params.id;

  if (!monsterId) {
    return res.status(404).json({
      message: 'Your last created monster escaped. Create another one',
    });
  }

  try {
    const result =
      await sql`SELECT * FROM monstersschema.monsters WHERE id = ${monsterId}`;
    if (result.length === 0) {
      return res.status(404).json({ message: 'Monster not found' });
    }
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
