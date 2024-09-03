-- Seed easy monsters
INSERT INTO monstersschema.monsters (name, hp, damage, difficulty) VALUES
('Bandit', 25, 8, 'easy'),
('Goblin', 30, 10, 'easy'),
('Orc', 40, 12, 'easy');

-- Seed medium monsters
INSERT INTO monstersschema.monsters (name, hp, damage, difficulty) VALUES
('Banshee', 55, 18, 'medium'),
('Troll', 60, 20, 'medium'),
('Minotaur', 70, 22, 'medium');

-- Seed hard monsters
INSERT INTO monstersschema.monsters (name, hp, damage, difficulty) VALUES
('Giant', 100, 28, 'hard'),
('Dragon', 110, 30, 'hard'),
('Hydra', 120, 35, 'hard');
