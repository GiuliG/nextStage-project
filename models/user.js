'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = require('./schemas/artist');
const hostSchema = require('./schemas/host');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Host', 'Artist', 'Attendee']
  },

  artist: artistSchema,
  host: hostSchema
});

const User = mongoose.model('User', userSchema);

module.exports = User;
