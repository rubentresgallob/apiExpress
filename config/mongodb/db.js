const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/habits_db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.log(err));

module.exports = mongoose;
