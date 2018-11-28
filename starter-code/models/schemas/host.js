'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hostSchema = new Schema({

  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  roomCapacity: {
    type: Number,
    required: true
  },
  scheduleTime: {
    type: Date
  }
});

module.exports = hostSchema;
