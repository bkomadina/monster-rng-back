import express from 'express';
import insertMonster from '../database/insertMonster.mjs';
import getMonsterByDifficulty from '../database/getMonsterByDifficulty.mjs';

const router = express.Router();

router.post('/add-monster', async (req, res) => {
  const { name, HP, damage, difficulty } = req.body;

  try {
    const newMonster = await insertMonster({ name, HP, damage, difficulty });
    res.status(201).json(newMonster);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/monster/:difficulty', async (req, res) => {
  const monsterDifficulty = req.params.difficulty;

  if (
    monsterDifficulty != 'easy' &&
    monsterDifficulty != 'medium' &&
    monsterDifficulty != 'hard'
  ) {
    return res.status(404).json({ message: 'No such difficulty found' });
  }

  try {
    const randomMonster = await getMonsterByDifficulty(monsterDifficulty);

    if (!randomMonster) {
      return res.status(404).json({
        message:
          'No monsters found with selected difficulty, please create more',
      });
    }
    res.json({
      name: randomMonster.name,
      HP: randomMonster.HP,
      damage: randomMonster.damage,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/lastcreated/:id', async (req, res) => {
  const monsterId = req.params.id;

  try {
    const monster = await sql`SELECT * FROM monsters WHERE id = ${monsterId}`;

    if (monster.length === 0) {
      return res
        .status(404)
        .json({
          message: 'Your last created monster escaped. Create another one',
        });
    }
    res.json({
      name: monster[0].name,
      HP: monster[0].HP,
      damage: monster[0].damage,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
