const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

// ✅ Register User
const registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, lastname, email, password } = req.body;

    console.log(req.body);

    const hashedPassword = await userModel.hashPassword(password); // ✅ Fixed: `awaituserModel` -> `await userModel`

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });
};

// ✅ Login User
const loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, user });
};

// ✅ Get Profile
const getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
};

// ✅ Logout User
const logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    await blackListTokenModel.create({ token });

    res.status(200).json({ message: 'Logged out' });
};

// ✅ Properly Export all functions
module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser
};
