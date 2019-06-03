const mongoose = require('mongoose');
const { db } = require('../config/database');

const Task = mongoose.Schema({
        name: String,
        description: String,
        isDelete: { type: Boolean, default: false},
        isActive: { type: Boolean, default: true}
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('tasks', Task);