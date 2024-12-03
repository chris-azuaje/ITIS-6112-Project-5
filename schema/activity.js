"use strict";

const mongoose = require('mongoose');

/**
 * Create a Mongoose Schema.
 */
const Activity = new mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    description: String,
});

/**
 * Create a Mongoose Model.
 */
const activitySchema = mongoose.model('Activity', Activity);

/**
 * Make this available to our application.
 */
module.exports = activitySchema;
