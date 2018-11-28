'use strict';

const express = require('express');
const router = express.Router();
const Event = require('../models/events');

/* GET home page. */
router.get('/', (req, res, next) => {
  // Get info from all events
  Event.find()
    .populate('hostId').populate('artistId')
    .then((result) => {
      console.log(result);
      res.render('index', { events: result });
    })
    .catch(next);
  // pass object with information to view
});

module.exports = router;
