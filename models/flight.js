const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Flight extends Model {}

Flight.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        airline: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        flight_number: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        from_airport: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        etd: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        to_airport: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        eta: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
            allowNull: false,
        },
        trip_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'trip',
                key: 'id',
            },
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'flight',
    }
);

module.exports = Flight;
