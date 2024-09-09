const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Itinerary extends Model {};

Itinerary.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        itinerary_location: 
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        itinerary_time:
        {
            type: DataTypes.DATE,
            allowNull: false,
        },
        notes:
        {
            type: DataTypes.TEXT,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        trip_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'trip',
                key: 'id',
            },
        }

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'itinerary',
    }
)

module.exports = Itinerary;