const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class UserTrip extends Model {}

UserTrip.init({
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    tripId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'trip',
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'UserTrip',
});

module.exports = UserTrip;
