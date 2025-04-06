const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Verificar si el modelo ya existe para evitar redefinirlo
if (mongoose.models.Task) {
    module.exports = mongoose.model('Task');
} else {
    const taskSchema = new Schema({
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        category: { type: String },
        title: { type: String, required: true },
        description: { type: String },
        dueDate: { type: Date },
        priority: { type: String, enum: ['alta', 'media', 'baja'] },
        completed: { type: Boolean, default: false },
        tags: [{ type: String }],
        translations: [{
            language: { type: String },
            title: { type: String },
            description: { type: String }
        }],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    });

    module.exports = mongoose.model('Task', taskSchema);
}