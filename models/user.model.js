const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Verificar si el modelo ya existe para evitar redefinirlo
if (mongoose.models.User) {
    module.exports = mongoose.model('User');
} else {
    const userSchema = new Schema({
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['usuario', 'admin'], default: 'usuario' },
        createdAt: { type: Date, default: Date.now }
    });

    module.exports = mongoose.model('User', userSchema);
}