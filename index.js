const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();
const port = 3000;

// Conectar a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/tareas_habitos_pro', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch((err) => console.error('❌ Error conectando a MongoDB:', err));

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// Importar rutas
const taskRoutes = require('./routes/tasks');
const habitRoutes = require('./routes/habits');
const userRoutes = require('./routes/users');

// Usar rutas
app.use('/tasks', taskRoutes);
app.use('/habits', habitRoutes);
app.use('/users', userRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.render('pages/home', { 
    title: 'Inicio',
    message: 'Bienvenido a la aplicación de Tareas y Hábitos',
  });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).render('pages/error', { 
    title: 'Error 404',
    message: 'Página no encontrada',
  });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('pages/error', { 
    title: 'Error',
    message: 'Ha ocurrido un error inesperado',
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});