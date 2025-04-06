const express = require('express');
const path = require('path');
const connectDB = require('./config/mongodb/db');
const taskRoutes = require('./routes/tasks');
const habitRoutes = require('./routes/habits');

const app = express();
const port = 3000;

// Conectar a MongoDB
connectDB();

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para parsear JSON y servir archivos estáticos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Página de inicio
app.get('/', (req, res) => {
  res.render('pages/home', { title: 'Inicio' });
});

// Rutas para tareas
app.use('/tasks', taskRoutes);

// Rutas para hábitos
app.use('/habits', habitRoutes);

// Ruta para búsqueda de hábitos (habitSearch.ejs)
app.get('/habitSearch', (req, res) => {
  res.render('pages/habitSearch', { title: 'Buscar Hábitos' });
});

// Ruta de error genérica
app.use((req, res) => {
  res.status(404).render('pages/error', { title: 'Error 404', message: 'Página no encontrada' });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});