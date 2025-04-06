const express = require('express');
const mongoose = require('./config/db');
const taskRoutes = require('./routes/tasks');
const app = express();

app.use(express.json());

// Ruta de prueba para '/'
app.get('/', (req, res) => {
  res.send('¡Hola desde Express + MongoDB!');
});

// Ruta para '/tasks'
app.use('/tasks', taskRoutes);

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});

