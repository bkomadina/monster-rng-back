-- Seed easy monsters
INSERT INTO monstersschema.monsters (name, hp, damage, difficulty) VALUES
('Bandit', 50, 7, 'easy'),
('Goblin', 22, 20, 'easy'),
('Orc', 60, 11, 'easy');

-- Seed medium monsters
INSERT INTO monstersschema.monsters (name, hp, damage, difficulty) VALUES
('Banshee', 30, 25, 'medium'),
('Troll', 120, 8, 'medium'),
('Minotaur', 70, 12, 'medium');

-- Seed hard monsters
INSERT INTO monstersschema.monsters (name, hp, damage, difficulty) VALUES
('Giant', 130, 12, 'hard'),
('Dragon', 80, 22, 'hard'),
('Hydra', 50, 30, 'hard');
