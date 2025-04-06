const mongoose = require('mongoose');

// Función para conectar a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/tareas_habitos_pro', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Conectado a MongoDB');
  } catch (err) {
    console.error('❌ Error conectando a MongoDB:', err);
    process.exit(1); // Salir del proceso si no se puede conectar
  }
};

// Exportar la función
module.exports = connectDB;