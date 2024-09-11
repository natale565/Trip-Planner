const sequelize = require('../config/connection');
const User = require('../models/user');

const userData = [
    {
        username: 'jsmith',
        email: 'john@example.com',
        password: 'password123'
    },
    {
        username: 'cwilliams',
        email: 'chris@example.com',
        password: 'password123'
    },
    {
        username: 'tjohnson',
        email: 'tom@example.com',
        password: 'password123'
    }
];

const seedUsers = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    console.log('Users seeded succesfully');
    process.exit(0);
};

seedUsers();