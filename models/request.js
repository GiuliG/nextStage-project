'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const requestSchema = new Schema({
  hostId: {
    type: ObjectId,
    ref: 'User'
  },
  artistId: {
    type: ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'accepted']
  }

});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
