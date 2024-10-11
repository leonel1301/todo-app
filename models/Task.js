const { DataTypes } = require('sequelize')
const {sequelize} = require('../config/database')
const User = require('../models/User')

const Task = sequelize.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    isCompleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
    {
        timestamps: true,
    }
);
User.hasMany(Task, {
    foreignKey: 'userId',
    as: 'tasks',
});
Task.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

module.exports = Task;