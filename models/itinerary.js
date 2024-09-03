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
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: 
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        time:
        {
            type: DataTypes.TIME,
            allowNull: false,
        },
        description:
        {
            type: DataTypes.TEXT,
            allowNull: false
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