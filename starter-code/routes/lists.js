'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authMiddleware = require('../middleware/authmiddleware');
const Request = require('../models/request');

router.get('/host-list', authMiddleware.requireUserArtist, (req, res, next) => {
  User.find({ role: 'Host' })
    .then((users) => {
      res.render('lists/host-list', { users });
    })
    .catch(next);
});

router.post('/host-list/:id', (req, res, next) => {
  const hostId = req.params.id;
  const { _id, artist } = req.session.currentUser;
  console.log(req.session.currentUser);
  const request = {
    hostId,
    artistId: _id,
    bandName: artist.bandName,
    genre: artist.genre,
    status: 'pending'
  };
  Request.create(request)
    .then((newRequest) => {
      res.redirect('/lists/host-list');
    })
    .catch(next);
});

module.exports = router;
