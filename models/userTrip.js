const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./user');
const Trip = require('./trip');

class UserTrip extends Model {}

UserTrip.init({
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
}, {
    sequelize,
    modelName: 'UserTrip',
});

module.exports = UserTrip;
