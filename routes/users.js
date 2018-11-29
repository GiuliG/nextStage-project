'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Request = require('../models/request');
const Event = require('../models/events');

router.get('/profiles/my-profile', (req, res, next) => {
  const { _id } = req.session.currentUser;

  User.findById(_id)
    .then((user) => {
      if (user.role === 'Host') {
        res.render('profiles/host-profile');
      } else if (user.role === 'Attendee') {
        let isAttending;
        Event.find({ attendees: req.session.currentUser._id })
          .populate('hostId').populate('artistId')
          .then((results) => {
            for (let i = 0; i < results.length; i++) {
              for (let j = 0; j < results[i].attendees.length; j++) {
                if (req.session.currentUser && results[i].attendees[j].equals(req.session.currentUser._id)) {
                  isAttending = true;
                }
              }
            }
            res.render('profiles/attendee-profile', { events: results, isAttending });
          })
          .catch(next);
      } else if (user.role === 'Artist') {
        Event.find({ artistId: req.session.currentUser._id })
          .populate('hostId')
          .then((result) => {
            res.render('profiles/artist-profile', { events: result });
          })
          .catch(next);
      }
    })
    .catch(next);
});

router.post('/profiles/my-profile', (req, res, next) => {
  const { pickadate } = req.body;
  const userId = req.session.currentUser._id;

  User.findByIdAndUpdate(userId, { $set: { 'host.scheduleTime': pickadate } }, { new: true })
    .then((result) => {
      console.log(result);

      return res.redirect('/users/profiles/my-profile');
    })
    .catch(next);
});
/*

router.get('/users/:id', (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
    if (err) {
      req.flash('error', 'Something went wrong.');
      return res.redirect('/');
    }
    res.render('profiles/host-profile', { user: foundUser });
  });
 });
*/
module.exports = router;
