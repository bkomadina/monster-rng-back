const express = require('express');
const router = express.Router();
const Monster = require('../schema/monsterSchema');

router.post('/add-monster', async (req, res) => {
  const monster = new Monster({
    name: req.body.name,
    HP: req.body.HP,
    damage: req.body.damage,
    difficulty: req.body.difficulty,
  });

  try {
    const newMonster = await monster.save();
    res.status(201).json(newMonster);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.get('/monster/:difficulty', async (req, res) => {
  const monsterDifficulty = req.params.difficulty;
  try {
    const randomMonster = await Monster.aggregate(
      [{ $match: { difficulty: monsterDifficulty } }, { $sample: { size: 1 } }],
      function (err, doc) {
        if (!doc) {
          return res
            .status(404)
            .json({
              message:
                'No monsters found with selected difficulty, please create more',
            });
        }
      }
    );
    res.json({
      name: randomMonster[0].name,
      HP: randomMonster[0].HP,
      damage: randomMonster[0].damage,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get('/lastcreated/:id', async (req, res) => {
  const monsterId = req.params.id;
  try {
    const randomMonster = await Monster.findById(monsterId, function (err, doc) {
      if (!doc) {
        return res.status(404).json({ message: 'Your last created monster escaped. Create another one'});
      }
    }
    );
    res.json({
      name: randomMonster.name,
      HP: randomMonster.HP,
      damage: randomMonster.damage,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
