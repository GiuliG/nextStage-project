'use strict';

const express = require('express');
const router = express.Router();
const Event = require('../models/events');
const Request = require('../models/request');
const authMiddleware = require('../middleware/authmiddleware');
const moment = require('moment');

router.post('/:requestId', (req, res, next) => {
  const requestId = req.params.requestId;
  const hostId = req.session.currentUser._id;
  Request.findByIdAndUpdate(requestId, { status: 'accepted' }, { new: true })
    .then((result) => {
      console.log(result);
      const newEvent = new Event({
        hostId,
        artistId: result.artistId._id,
        requestId
      });
      newEvent.save()
        .then(() => {
          res.redirect('/lists/my-requests');
        })
        .catch(next);
    })
    .catch(next);
});

router.post('/:eventId/attend', authMiddleware.requireUser, (req, res, next) => {
  const eventId = req.params.eventId;
  const userId = req.session.currentUser._id;
  Event.findByIdAndUpdate(eventId, { $push: { attendees: userId } }, { new: true })
    .then((result) => {
      console.log(result);
      return res.redirect('/#events');
    })
    .catch(next);
});

// GET list of events by user
router.get('/attendee-profile', (req, res, next) => {
  const { _id } = req.session.currentUser;
  Event.find({ attendee: _id })
    .populate('hostId').populate('artistId')
    .then((result) => {
      console.log(result);
      res.render('/attendee-profile', { events: result });
    })
    .catch(next);
});

module.exports = router;
