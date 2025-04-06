const mongoose = require('mongoose');
const User = require('../modules/user/user.model');
const Task = require('../models/Task');
const Habit = require('../models/Habits');

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/tareas_habitos_pro')
    .then(() => console.log('Conectado a MongoDB para seed'))
    .catch(err => console.error('Error conectando a MongoDB:', err));

async function seedDatabase() {
    try {
        // Limpiar colecciones existentes
        await User.deleteMany({});
        await Task.deleteMany({});
        await Habit.deleteMany({});

        // Crear usuarios
        const users = await User.insertMany([
            {
                username: 'carlos',
                email: 'carlos@mail.com',
                password: '123hashed',
                role: 'usuario'
            },
            {
                username: 'ana',
                email: 'ana@mail.com',
                password: '456hashed',
                role: 'usuario'
            }
        ]);

        // Crear tareas
        await Task.insertMany([
            {
                userId: users[0]._id,
                category: 'Estudio',
                title: 'Preparar presentación',
                description: 'Tema: Historia de la IA',
                dueDate: new Date('2025-04-20'),
                priority: 'alta',
                completed: false,
                tags: ['urgente', 'diario'],
                translations: [
                    {
                        language: 'en',
                        title: 'Prepare presentation',
                        description: 'Topic: History of AI'
                    }
                ]
            },
            {
                userId: users[1]._id,
                category: 'Salud',
                title: 'Cita médica',
                description: 'Chequeo general',
                dueDate: new Date('2025-04-08'),
                priority: 'media',
                completed: false,
                tags: ['opcional'],
                translations: [
                    {
                        language: 'en',
                        title: 'Doctor appointment',
                        description: 'General checkup'
                    }
                ]
            }
        ]);

        // Crear hábitos
        await Habit.insertMany([
            {
                userId: users[0]._id,
                name: 'Caminar',
                frequency: 'diario',
                goalPerPeriod: 30,
                unit: 'minutos',
                progress: [
                    {
                        value: 30,
                        notes: 'Caminata en el parque',
                        completionDate: new Date('2025-04-01')
                    },
                    {
                        value: 35,
                        notes: 'Caminata con amigos',
                        completionDate: new Date('2025-04-02')
                    }
                ],
                translations: [
                    {
                        language: 'en',
                        name: 'Walk'
                    }
                ]
            },
            {
                userId: users[0]._id,
                name: 'Leer',
                frequency: 'semanal',
                goalPerPeriod: 3,
                unit: 'capítulos',
                progress: [
                    {
                        value: 1,
                        notes: 'Capítulo 1 del libro de historia',
                        completionDate: new Date('2025-04-03')
                    }
                ],
                translations: [
                    {
                        language: 'en',
                        name: 'Read'
                    }
                ]
            }
        ]);

        console.log('Base de datos poblada con éxito');
        process.exit(0);
    } catch (error) {
        console.error('Error al poblar la base de datos:', error);
        process.exit(1);
    }
}

seedDatabase();