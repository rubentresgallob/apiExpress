const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/tareas_habitos_pro', {
  useNewUrlParser: true,
  useUnifiedTopology: true
  // Se eliminaron las opciones obsoletas:
  // useFindAndModify: false,
  // useCreateIndex: true
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch((err) => console.error('❌ Error conectando a MongoDB:', err));

module.exports = mongoose;