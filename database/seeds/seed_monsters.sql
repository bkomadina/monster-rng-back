-- Seed easy monsters
INSERT INTO monstersschema.monsters (name, hp, damage, difficulty, is_seeded) VALUES
('Bandit', 50, 7, 'easy', TRUE),
('Goblin', 22, 20, 'easy', TRUE),
('Orc', 60, 11, 'easy', TRUE);

-- Seed medium monsters
INSERT INTO monstersschema.monsters (name, hp, damage, difficulty, is_seeded) VALUES
('Banshee', 30, 25, 'medium', TRUE),
('Troll', 120, 8, 'medium', TRUE),
('Minotaur', 70, 12, 'medium', TRUE);

-- Seed hard monsters
INSERT INTO monstersschema.monsters (name, hp, damage, difficulty, is_seeded) VALUES
('Giant', 130, 12, 'hard', TRUE),
('Dragon', 80, 22, 'hard', TRUE),
('Hydra', 50, 30, 'hard', TRUE);