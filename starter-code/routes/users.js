'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Request = require('../models/request');

router.get('/profiles/my-profile', (req, res, next) => {
  const { _id } = req.session.currentUser;

  User.findById(_id)
    .then((user) => {
      if (user.role === 'Host') {
        res.render('profiles/host-profile');
      } else if (user.role === 'Attendee') {
        res.render('profiles/attendee-profile');
      } else if (user.role === 'Artist') {
        res.render('profiles/artist-profile');
      }
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
