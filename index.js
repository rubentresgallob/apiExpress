const express = require('express');
const mongoose = require('./config/db');
const taskRoutes = require('./routes/tasks');
const app = express();

app.use(express.json());
app.use('/tasks', taskRoutes);

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
