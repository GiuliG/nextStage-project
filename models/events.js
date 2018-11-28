'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const eventsSchema = new Schema({
  hostId: {
    type: ObjectId,
    ref: 'User'
  },
  artistId: {
    type: ObjectId,
    ref: 'User'
  },
  requestId: {
    type: ObjectId,
    ref: 'User'
  },
  attendees: [{
    type: ObjectId,
    ref: 'User'
  }]
});

const Event = mongoose.model('Event', eventsSchema);

module.exports = Event;
