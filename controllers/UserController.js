const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(201).json({id: user.id, token: token});
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
};

exports.registerUser = async (req, res) => {
    const { names, lastName, motherLastName, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'El email ya esta registrado' });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({
            names,
            lastName,
            motherLastName,
            email,
            password: hashedPassword
        });
        var token = jwt.sign({userId: newUser.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(201).json({ id: newUser.id, token: token });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'names', 'lastName', 'motherLastName', 'email']
        });
        res.json(users);
    }
    catch (error) {
        res.status(500).send('An error ocurred');
    }
}

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: ['id', 'names', 'lastName', 'motherLastName', 'email']
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).send('An error ocurred');
    }
}