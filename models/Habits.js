const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Verificar si el modelo ya existe para evitar redefinirlo
if (mongoose.models.Habit) {
    module.exports = mongoose.model('Habit');
} else {
    const habitProgressSchema = new Schema({
        value: { type: Number, default: 1 },
        notes: { type: String },
        completionDate: { type: Date, required: true }
    });

    const habitSchema = new Schema({
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        name: { type: String, required: true },
        frequency: { type: String, enum: ['diario', 'semanal'], required: true },
        goalPerPeriod: { type: Number, default: 1 },
        unit: { type: String },
        progress: [habitProgressSchema],
        translations: [{
            language: { type: String },
            name: { type: String }
        }],
        createdAt: { type: Date, default: Date.now }
    });

    module.exports = mongoose.model('Habit', habitSchema);
}