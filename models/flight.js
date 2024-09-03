const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Flight extends Model {};

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
        from_airport: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        to_aiport: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        etd: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        eta: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        flight_number: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'flight'
    }
);

module.exports = Flight;