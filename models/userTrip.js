const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./user');
const Trip = require('./trip');

const UserTrip = sequelize.define('UserTrip', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    tripId: {
        type: DataTypes.INTEGER,
        references: {
            model: Trip,
            key: 'id'
        }
    }
});

module.exports = { User, Trip, UserTrip };
