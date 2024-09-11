const sequelize = require('../config/connection');
const Flight = require('../models/flight');

const flightData = [
  {
    airline: 'Delta Airlines',
    flight_number: 'DL123',
    from_airport: 'CDG',
    etd: new Date('2024-10-10 14:00:00'),
    to_airport: 'LAX',
    eta: new Date('2024-10-10 17:00:00'),
    user_id: 1,  
    trip_id: 1, 
  },
  {
    airline: 'American Airlines',
    flight_number: 'AA456',
    from_airport: 'LAX',
    etd: new Date('2024-11-15 08:30:00'),
    to_airport: 'JFK',
    eta: new Date('2024-11-15 12:00:00'),
    user_id: 2,  
    trip_id: 2,  
  },
  {
    airline: 'United Airlines',
    flight_number: 'UA789',
    from_airport: 'ORD',
    etd: new Date('2024-12-01 10:15:00'),
    to_airport: 'HND',
    eta: new Date('2024-12-01 14:30:00'),
    user_id: 3,
    trip_id: 3,
  },
];

const seedFlights = async () => {
  await sequelize.sync({ force: true }); 

  await Flight.bulkCreate(flightData, {
    returning: true,
  });

  console.log('Flights seeded successfully!');
  process.exit(0);
};

seedFlights();
