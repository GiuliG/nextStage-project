'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
  hostId: {
    type: String,
    required: true,
    unique: true
  },
  artistId: {
    type: String,
    required: true,
    unique: true
  },
  bandName: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true,
    enum: ['rock', 'jazz', 'hip-hop', 'pop', 'country', 'metal', 'classic', 'electronic', 'blues', 'rnb']

  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'accepted']
  }

});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
