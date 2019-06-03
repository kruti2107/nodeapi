const mongoose = require('mongoose');
const { db } = require('../config/database');

const User = mongoose.Schema({
        email: String,
        password: String,
        isDelete: { type: Boolean, default: false},
        isActive: { type: Boolean, default: true}
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('users', User);