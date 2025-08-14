-- Seed Users
INSERT INTO users (username, password)
VALUES
  ('essa', 'password'), 
  ('hanan', 'password2'),
  ('salman', 'password3');

-- Seed Categories (global only)
INSERT INTO categories (name, color, image_url, category_description) VALUES
('Grocery', '#D9E76C', 'https://cdn-icons-png.flaticon.com/128/3075/3075977.png', 'Grocery shopping and essentials.'),
('Work', '#6CE7C2', 'https://cdn-icons-png.flaticon.com/128/6978/6978255.png', 'Work and office tasks.'),
('Sport', '#6CB8E7', 'https://cdn-icons-png.flaticon.com/128/3041/3041130.png', 'Sports and fitness activities.'),
('Design', '#6C7AE7', 'https://cdn-icons-png.flaticon.com/128/1046/1046769.png', 'Design and creative work.'),
('University', '#B96CE7', 'https://cdn-icons-png.flaticon.com/128/2153/2153786.png', 'University and study tasks.'),
('Social', '#E76CB9', 'https://cdn-icons-png.flaticon.com/128/4465/4465242.png', 'Social and community events.'),
('Music', '#E76C6C', 'https://cdn-icons-png.flaticon.com/128/2405/2405479.png', 'Music and practice.'),
('Health', '#E7B96C', 'https://cdn-icons-png.flaticon.com/128/3014/3014502.png', 'Health and wellness.'),
('Movie', '#6CE77A', 'https://cdn-icons-png.flaticon.com/128/5787/5787330.png', 'Movies and entertainment.'),
('Home', '#6CE7E7', 'https://cdn-icons-png.flaticon.com/128/8688/8688560.png', 'Home and family tasks.');

-- Seed Tasks (fix columns: add category_id)
INSERT INTO tasks (user_id, category_id, title, description, due_date, due_time, priority, completed)
VALUES
  (1, 1, 'Finish project report', 'Write and review the final project report for submission', '2025-08-15', '14:00', 8, false),
  (1, 2, 'Buy groceries', 'Milk, eggs, bread, and coffee', '2025-08-13', '17:30', 5, false),
  (2, 3, 'Gym workout', 'Leg day training session', '2025-08-14', '18:00', 6, false),
  (2, 4, 'Read book', 'Finish reading "Atomic Habits"', '2025-08-20', NULL, 4, false),
  (3, 5, 'Team meeting', 'Weekly project sync-up with team', '2025-08-16', '09:30', 7, false);