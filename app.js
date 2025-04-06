const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Inicializar MongoDB
try {
    require('./modules/mongodb/mongodb.module').init();
    console.log('MongoDB inicializado correctamente');
} catch (error) {
    console.error('Error al inicializar MongoDB:', error);
    // Intentar inicializar MongoDB directamente
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/tareas_habitos_pro')
        .then(() => console.log('MongoDB conectado directamente'))
        .catch(err => console.error('Error conectando directamente a MongoDB:', err));
}

// Ruta de prueba simple
app.get('/test', (req, res) => {
    console.log('Ruta /test accedida');
    res.json({ message: 'Test route working' });
});

// Rutas - sin prefijo /api
app.use('/users', require('./routes/users'));
app.use('/tasks', require('./routes/tasks'));
app.use('/habits', require('./routes/habits'));

// Manejo de errores 404
app.use((req, res, next) => {
    console.log(`404 - Ruta no encontrada: ${req.method} ${req.url}`);
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
    console.error('Error en la aplicación:', err.stack);
    res.status(500).json({ message: 'Error interno del servidor' });
});

module.exports = app;