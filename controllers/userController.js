const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { protect, isAdmin } = require('../middleware/oAuth');

const registerUser = asyncHandler(async (req, res) => {
    const { username, password, isAdmin } = req.body;

    const userExists = await User.findOne({ username });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username: username,
        password: hashedPassword,
        isAdmin: isAdmin,
    });

    if (user) {
        res.status(201);
        res.json({
            _id: user._id,
            username: user.username,
            isAdmin: user.isAdmin,
            token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '30d',
            }),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            username: user.username,
            isAdmin: user.isAdmin,
            token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '30d',
            }),
        });
    } else {
        res.status(401);
        throw new Error('Invalid username or password');
    }
});

const getAllAdmins = asyncHandler(async (req, res) => {
    const admins = await User.find({ isAdmin: true }).select('_id username');
    res.json(admins);
});

module.exports = { registerUser, authUser, getAllAdmins };