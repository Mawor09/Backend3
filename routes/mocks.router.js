import { Router } from 'express';
import { generateMockUsers } from '../utils/mocking.js';
import UserModel from '../models/User.js'; // Modelo de usuarios
import PetModel from '../models/Pet.js'; // Modelo de mascotas (ajusta el path si es necesario)

const router = Router();

// Endpoint para mockingpets
router.get('/mockingpets', (req, res) => {
    // Lógica previa del desafío entregable
    const pets = []; // Simulación de mascotas
    res.json({ status: 'success', data: pets });
});

// Endpoint GET para generar 50 usuarios mock
router.get('/mockingusers', (req, res) => {
    const users = generateMockUsers(50);
    res.json({ status: 'success', users });
});

// Endpoint POST para generar datos (usuarios y mascotas)
router.post('/generateData', async (req, res) => {
    const { users, pets } = req.body;

    if (!users || !pets) {
        return res.status(400).json({ status: 'error', message: 'Parámetros "users" y "pets" requeridos.' });
    }

    try {
        const mockUsers = generateMockUsers(users);
        const mockPets = Array.from({ length: pets }, () => ({
            _id: faker.datatype.uuid(),
            name: faker.name.firstName(),
            species: faker.random.arrayElement(['dog', 'cat', 'bird']),
            owner: null, // Asociaremos más adelante si es necesario
        }));

        // Inserción en la base de datos
        await UserModel.insertMany(mockUsers);
        await PetModel.insertMany(mockPets);

        res.json({
            status: 'success',
            message: 'Datos generados e insertados exitosamente.',
            inserted: {
                users: mockUsers.length,
                pets: mockPets.length,
            },
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al insertar datos.', error });
    }
});

export default router;
