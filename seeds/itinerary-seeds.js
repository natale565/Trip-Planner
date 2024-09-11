const sequelize = require('../config/connection');
const Itinerary = require('../models/itinerary');

const itineraryData = [
  {
    description: 'Visit Eiffel Tower',
    itinerary_location: 'Av. Gustave Eiffel, 75007 Paris, France',
    itinerary_time: new Date('2024-10-06 10:00:00'),
    notes: 'Buy tickets in advance and arrive early to avoid long lines.',
    user_id: 1,
    trip_id: 1,
  },
  {
    description: 'Broadway Show',
    itinerary_location: '200 W 45th St, New York, NY 10036',
    itinerary_time: new Date('2024-11-02 19:30:00'),
    notes: 'Attend "The Lion King" at Minskoff Theatre.',
    user_id: 2,
    trip_id: 2, 
  },
  {
    description: 'Sushi Dinner',
    itinerary_location: 'Japan, 〒104-0061 Tokyo, Chuo City, Ginza, 4 Chome 2 15 塚本総業ビルB1階',
    itinerary_time: new Date('2024-12-22 18:00:00'),
    notes: 'Reservation at Sukiyabashi Jiro.',
    user_id: 3,
    trip_id: 3,
  },
];

const seedItineraries = async () => {
  await sequelize.sync({ force: true }); 

  await Itinerary.bulkCreate(itineraryData, {
    returning: true, 
  });

  console.log('Itineraries seeded successfully!');
  process.exit(0);
};

seedItineraries();
