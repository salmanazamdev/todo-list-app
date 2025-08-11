-- Users
INSERT INTO users (username, email, password)
VALUES 
('salman', 'salman.dev@sample.com', 'hashedpassword1'),
('hanan', 'hanan.dev@sample.com', 'hashedpassword1'),
('essa', 'essa.dev@sample.com', 'hashedpassword2');


-- Tasks
INSERT INTO tasks (user_id, task_name, priority)
VALUES
(1, 'Complete project report', 5),
(1, 'Attend team meeting', 3),
(2, 'Review pull requests', 4),
(2, 'Update documentation', 2),
(3, 'Fix bugs in the application', 6),
(3, 'Prepare for presentation', 8);
