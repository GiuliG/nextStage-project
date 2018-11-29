'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Request = require('../models/request');

const parser = require('../helpers/file-upload');

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

router.post('/upload-my-image', parser.single('image'), (req, res, next) => {
  if (req.fileValidationError) {
    req.flash('wrongType', 'Wrong file type uploaded');
    res.redirect('/users/profiles/my-profile');
    return;
  }
  const userId = req.session.currentUser._id;
  console.log(req.file);
  const imageUrl = req.file.url;

  User.findByIdAndUpdate(userId, { $set: { 'host.imageUrl': imageUrl } }, { new: true })
    .then((user) => {
      req.session.currentUser = user;
      console.log(user);
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
