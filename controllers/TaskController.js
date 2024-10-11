const Task = require('../models/Task');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');


exports.createTask = async (req, res) => {
    const {title, description, dueDate, isCompleted, userId, status} = req.body;
    try {
        const newTask = await Task.create({
            title,
            description,
            dueDate,
            isCompleted,
            userId,
            status
        })
        res.status(201).json(newTask);
    }
    catch (error) 
    {
        console.error(error);
        res.status(500).send('An error occurred');
    }
}

exports.getTasks = async (req, res) => {
    try {
        const tasksInDb = await Task.findAll();
        res.json(tasksInDb);
    }
    catch (error)
    {
        res.status(500).json({message: 'An error ocurred'});
    }
}

exports.getTaskByStatus = async (req, res) => {
    try {
        const response = await Task.findAll({where: {status: req.params.status}});
        res.json(response);
    }
    catch(error)
    {
        res.status(500).json({message: 'An error ocurred'});
    }
}

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task)
        {
            return res.status(404).json({message: 'Tarea no encontrada'})
        }
        res.json(task);
    }
    catch (error) {
        res.status(500).send('An error ocurred');
    }
}

exports.updateTask = async (req, res) => {
    const {title, description, dueDate, isCompleted, userId, status} = req.body;
    try {
        const existingTask = await Task.findByPk(req.params.id);
        if (!existingTask) {
            return res.status(400).json({message: 'Tarea no encontrada'});
        }
        else {
            await Task.update({
                title,
                description,
                dueDate,
                isCompleted,
                userId,
                status
            },
        {
            where: { id : req.params.id}
        })
            const updatedTask = await Task.findByPk(req.params.id);
            res.status(200).json(updatedTask);
        }
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send('An error occurred');
    }
}

exports.deleteTask = async (req, res) => {
    try{
        await Task.destroy({where: {id : req.params.id}});
        res.status(200).json({message: 'Tarea eliminada'});
    }
    catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
}