const { DataTypes } = require('sequelize')
const {sequelize} = require('../config/database')

const User = sequelize.define('User', {
    names: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    motherLastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        timestamps: true,
    }
);
module.exports = User;