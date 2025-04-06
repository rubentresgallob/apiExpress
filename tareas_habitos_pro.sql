
CREATE DATABASE tareas_habitos_pro;

-- Tabla de roles de usuario
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) UNIQUE NOT NULL
);

-- Tabla de usuarios
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role_id INTEGER REFERENCES roles(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de categorías de tareas
CREATE TABLE task_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

-- Tabla de tareas
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES task_categories(id),
  title VARCHAR(100) NOT NULL,
  description TEXT,
  due_date DATE,
  priority VARCHAR(10) CHECK (priority IN ('alta', 'media', 'baja')),
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de etiquetas para tareas
CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

-- Relación muchos a muchos entre tareas y etiquetas
CREATE TABLE task_tags (
  task_id INTEGER REFERENCES tasks(id) ON DELETE CASCADE,
  tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (task_id, tag_id)
);

-- Tabla de hábitos
CREATE TABLE habits (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  frequency VARCHAR(10) CHECK (frequency IN ('diario', 'semanal')),
  goal_per_period INTEGER DEFAULT 1,
  unit VARCHAR(20), -- ejemplo: "minutos", "repeticiones"
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Progreso detallado de hábitos
CREATE TABLE habit_progress (
  id SERIAL PRIMARY KEY,
  habit_id INTEGER REFERENCES habits(id) ON DELETE CASCADE,
  value INTEGER DEFAULT 1, -- cantidad lograda en esa fecha
  notes TEXT,
  completion_date DATE NOT NULL
);

-- Tabla de idiomas
CREATE TABLE languages (
  id SERIAL PRIMARY KEY,
  code VARCHAR(5) UNIQUE NOT NULL, -- ej: 'es', 'en'
  name VARCHAR(50) NOT NULL
);

-- Traducciones de tareas (multilingüe)
CREATE TABLE task_translations (
  id SERIAL PRIMARY KEY,
  task_id INTEGER REFERENCES tasks(id) ON DELETE CASCADE,
  language_id INTEGER REFERENCES languages(id),
  title VARCHAR(100),
  description TEXT,
  UNIQUE(task_id, language_id)
);

-- Traducciones de hábitos (multilingüe)
CREATE TABLE habit_translations (
  id SERIAL PRIMARY KEY,
  habit_id INTEGER REFERENCES habits(id) ON DELETE CASCADE,
  language_id INTEGER REFERENCES languages(id),
  name VARCHAR(100),
  UNIQUE(habit_id, language_id)
);

-- ------------------------------
-- 📥 INSERTS DE EJEMPLO
-- ------------------------------

-- Roles
INSERT INTO roles (name) VALUES ('usuario'), ('admin');

-- Idiomas
INSERT INTO languages (code, name) VALUES
('es', 'Español'), ('en', 'Inglés');

-- Usuarios
INSERT INTO users (username, email, password, role_id) VALUES
('carlos', 'carlos@mail.com', '123hashed', 1),
('ana', 'ana@mail.com', '456hashed', 1);

-- Categorías de tareas
INSERT INTO task_categories (name) VALUES ('Estudio'), ('Salud'), ('Trabajo'), ('Personal');

-- Tareas
INSERT INTO tasks (user_id, category_id, title, description, due_date, priority, completed) VALUES
(1, 1, 'Preparar presentación', 'Tema: Historia de la IA', '2025-04-20', 'alta', false),
(2, 2, 'Cita médica', 'Chequeo general', '2025-04-08', 'media', false);

-- Etiquetas
INSERT INTO tags (name) VALUES ('urgente'), ('opcional'), ('diario');

-- Tareas con etiquetas
INSERT INTO task_tags (task_id, tag_id) VALUES
(1, 1), -- urgente
(1, 3), -- diario
(2, 2); -- opcional

-- Traducciones
INSERT INTO task_translations (task_id, language_id, title, description) VALUES
(1, 2, 'Prepare presentation', 'Topic: History of AI'),
(2, 2, 'Doctor appointment', 'General checkup');

-- Hábitos
INSERT INTO habits (user_id, name, frequency, goal_per_period, unit) VALUES
(1, 'Caminar', 'diario', 30, 'minutos'),
(1, 'Leer', 'semanal', 3, 'capítulos');

-- Progreso de hábitos
INSERT INTO habit_progress (habit_id, value, notes, completion_date) VALUES
(1, 30, 'Caminata en el parque', '2025-04-01'),
(1, 35, 'Caminata con amigos', '2025-04-02'),
(2, 1, 'Capítulo 1 del libro de historia', '2025-04-03');

-- Traducciones de hábitos
INSERT INTO habit_translations (habit_id, language_id, name) VALUES
(1, 2, 'Walk'),
(2, 2, 'Read');
