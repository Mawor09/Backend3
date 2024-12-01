import faker from 'faker';
import bcrypt from 'bcrypt';

export const generateMockUsers = (numUsers) => {
    const users = [];
    for (let i = 0; i < numUsers; i++) {
        const role = faker.random.arrayElement(['user', 'admin']);
        const password = bcrypt.hashSync('coder123', 10); // Contraseña encriptada
        const user = {
            _id: faker.datatype.uuid(),
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: password,
            role: role,
            pets: [], // Array vacío
        };
        users.push(user);
    }
    return users;
};
