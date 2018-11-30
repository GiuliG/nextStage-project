'use strict';

const express = require('express');
const router = express.Router();
const Event = require('../models/events');

/* GET home page. */
router.get('/', (req, res, next) => {
  // Get info from all events
  Event.find()
    .populate('hostId')
    .populate('artistId')
    .then((results) => {
      for (let i = 0; i < results.length; i++) {
        console.log(results[i].attendees);
        if (!results[i].attendees.length === 0) {
          for (let j = 0; j < results[i].attendees.length; j++) {
            if (req.session.currentUser && results[i].attendees[j].equals(req.session.currentUser._id)) {
              results[i].isAttending = true;
            }
            results[i].available = results[i].hostId.host.roomCapacity - results[i].attendees.length;
            console.log(results[i].available);
          }
        } else {
          results[i].available = results[i].hostId.host.roomCapacity;
        }
      }

      res.render('index', { events: results });
    })
    .catch(next);
  // pass object with information to view
});

module.exports = router;
