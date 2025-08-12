-- Seed Users
INSERT INTO users (username, password)
VALUES
  ('essa', 'password'), -- example bcrypt hash
  ('hanan', 'password2'),
  ('salman', 'password3');

-- Seed Tasks
INSERT INTO tasks (user_id, title, description, due_date, due_time, priority, completed)
VALUES
  (1, 'Finish project report', 'Write and review the final project report for submission', '2025-08-15', '14:00', 8, false),
  (1, 'Buy groceries', 'Milk, eggs, bread, and coffee', '2025-08-13', '17:30', 5, false),
  (2, 'Gym workout', 'Leg day training session', '2025-08-14', '18:00', 6, false),
  (2, 'Read book', 'Finish reading "Atomic Habits"', '2025-08-20', NULL, 4, false),
  (3, 'Team meeting', 'Weekly project sync-up with team', '2025-08-16', '09:30', 7, false);
