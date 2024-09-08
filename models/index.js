const User = require('./user');
const Flight = require('./flight');
const Itinerary = require('./itinerary');
const Lodging = require('./lodging');
const Trip = require('./trip');
const UserTrip = require('./userTrip');

// User-Lodging association
User.hasMany(Lodging, {
    foreignKey: 'user_id'
});
Lodging.belongsTo(User, {
    foreignKey: 'user_id'
});

// User-Flight association
User.hasMany(Flight, {
    foreignKey: 'user_id'
});
Flight.belongsTo(User, {
    foreignKey: 'user_id'
});

// User-Itinerary association
User.hasMany(Itinerary, {
    foreignKey: 'user_id'
});
Itinerary.belongsTo(User, {
    foreignKey: 'user_id'
});

// User-Trip association (many-to-many) via UserTrip
User.belongsToMany(Trip, {
    through: UserTrip,
    foreignKey: 'user_id'
});
Trip.belongsToMany(User, {
    through: UserTrip,
    foreignKey: 'trip_id'
});

// User has many Trips (one-to-many)
User.hasMany(Trip, {
    foreignKey: 'user_id'
});
Trip.belongsTo(User, {
    foreignKey: 'user_id'
});

// Trip-Flight association with cascade delete
Trip.hasMany(Flight, { 
    foreignKey: 'trip_id',
    onDelete: 'CASCADE'
});
Flight.belongsTo(Trip, { 
    foreignKey: 'trip_id'
});

// Trip-Lodging association with cascade delete
Trip.hasMany(Lodging, { 
    foreignKey: 'trip_id',
    onDelete: 'CASCADE' 
});
Lodging.belongsTo(Trip, { 
    foreignKey: 'trip_id'
});

// Trip-Itinerary association with cascade delete
Trip.hasMany(Itinerary, { 
    foreignKey: 'trip_id',
    onDelete: 'CASCADE'
});
Itinerary.belongsTo(Trip, { 
    foreignKey: 'trip_id'
});

module.exports = { User, Flight, Itinerary, Lodging, Trip, UserTrip };
