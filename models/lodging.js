const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Lodging extends Model {}

Lodging.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        check_in: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        check_out: {
            type: DataTypes.STRING,
            allow: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'lodging'
    }
);

module.exports = Lodging;