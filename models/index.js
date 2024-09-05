const User = require('./user');
const Flight = require('./flight');
const Itinerary = require('./itinerary');
const Lodging = require('./lodging');
const Trip = require('./trip');
const UserTrip = require('./userTrip');

// User associations
User.hasMany(Lodging, {
    foreignKey: 'user_id'
});
Lodging.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Flight, {
    foreignKey: 'user_id'
});
Flight.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Itinerary, {
    foreignKey: 'user_id'
});
Itinerary.belongsTo(User, {
    foreignKey: 'user_id'
});

User.belongsToMany(Trip, {
    through: UserTrip,
    foreignKey: 'userId'
});
Trip.belongsToMany(User, {
    through: UserTrip,
    foreignKey: 'tripId'
});

module.exports = { User, Flight, Itinerary, Lodging, Trip, UserTrip };
