-- Seed Users
INSERT INTO users (username, password)
VALUES
  ('essa', 'password'), 
  ('hanan', 'password2'),
  ('salman', 'password3');

-- Seed Categories (global only)
INSERT INTO categories (name, color, image_url, category_description) VALUES
('Grocery', '#D9E76C', 'https://cdn-icons-png.flaticon.com/128/3514/3514211.png', 'Grocery shopping and essentials.'),
('Work', '#6CE7C2', 'https://cdn-icons-png.flaticon.com/128/3281/3281307.png', 'Work and office tasks.'),
('Sport', '#6CB8E7', 'https://cdn-icons-png.flaticon.com/128/5540/5540420.png', 'Sports and fitness activities.'),
('Design', '#6C7AE7', 'https://cdn-icons-png.flaticon.com/128/3199/3199899.png', 'Design and creative work.'),
('University', '#B96CE7', 'https://cdn-icons-png.flaticon.com/128/8074/8074800.png', 'University and study tasks.'),
('Social', '#E76CB9', 'https://cdn-icons-png.flaticon.com/128/18509/18509485.png', 'Social and community events.'),
('Music', '#E76C6C', 'https://cdn-icons-png.flaticon.com/128/3659/3659784.png', 'Music and practice.'),
('Health', '#E7B96C', 'https://cdn-icons-png.flaticon.com/128/2382/2382533.png', 'Health and wellness.'),
('Movie', '#6CE77A', 'https://cdn-icons-png.flaticon.com/128/4221/4221484.png', 'Movies and entertainment.'),
('Home', '#6CE7E7', 'https://cdn-icons-png.flaticon.com/128/619/619153.png', 'Home and family tasks.');

-- Seed Tasks (fix columns: add category_id)
INSERT INTO tasks (user_id, category_id, title, description, due_date, due_time, priority, completed)
VALUES
  (1, 1, 'Finish project report', 'Write and review the final project report for submission', '2025-08-15', '14:00', 8, false),
  (1, 2, 'Buy groceries', 'Milk, eggs, bread, and coffee', '2025-08-13', '17:30', 5, false),
  (2, 3, 'Gym workout', 'Leg day training session', '2025-08-14', '18:00', 6, false),
  (2, 4, 'Read book', 'Finish reading "Atomic Habits"', '2025-08-20', NULL, 4, false),
  (3, 5, 'Team meeting', 'Weekly project sync-up with team', '2025-08-16', '09:30', 7, false);