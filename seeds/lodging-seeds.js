const sequelize = require('../config/connection');
const Lodging = require('../models/lodging');

const lodgingData = [
  {
    lodging_name: 'Hilton Paris Opera',
    lodging_location: '108 Rue Saint-Lazare, 75008 Paris, France',
    check_in: new Date('2024-10-05 16:00:00'),
    check_out: new Date('2024-10-10 11:00:00'),
    user_id: 1,  
    trip_id: 1,
  },
  {
    lodging_name: 'The Ritz-Carlton',
    lodging_location: '50 Central Park S, New York, NY 10019',
    check_in: new Date('2024-11-01 16:00:00'),
    check_out: new Date('2024-11-05 11:00:00'), 
    user_id: 2,  
    trip_id: 2,
  },
  {
    lodging_name: 'Hotel Okura Tokyo',
    lodging_location: '2 Chome-10-4 Toranomon, Minato City, Tokyo 105-0001, Japan',
    check_in: new Date('2024-12-20 16:00:00'),
    check_out: new Date('2024-12-27 11:00:00'), 
    user_id: 3, 
    trip_id: 3,  
  },
];

const seedLodgings = async () => {
  await sequelize.sync({ force: true });

  await Lodging.bulkCreate(lodgingData, {
    returning: true,
  });

  console.log('Lodgings seeded successfully!');
  process.exit(0);
};

seedLodgings();
