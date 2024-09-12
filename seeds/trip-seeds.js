const sequelize = require('../config/connection');
const Trip = require('../models/trip');

const tripData = [
  {
    location: 'Paris, France',
    user_id: 1,
  },
  {
    location: 'New York City, USA',
    user_id: 2,
  },
  {
    location: 'Tokyo, Japan',
    user_id: 3,
  },
  {
    location: 'Hawaii, USA',
    user_id: 1,
  },
  {
    location: 'Rome, Italy',
    user_id: 2,
  },
  {
    location: 'London, England',
    user_id: 3,
  }
];

const seedTrips = async () => {
  await sequelize.sync({ force: true });

  await Trip.bulkCreate(tripData, {
    returning: true,
  });

  console.log('Trips seeded successfully!');
  process.exit(0);
};

seedTrips();
