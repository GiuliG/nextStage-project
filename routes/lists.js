'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authMiddleware = require('../middleware/authmiddleware');
const Request = require('../models/request');

router.get('/host-list', authMiddleware.requireUserArtist, (req, res, next) => {
  const artistId = req.session.currentUser._id;

  User.find({ role: 'Host' })
    .then((hosts) => {
      // I am an artist and I am looking at a list of hosts that I can book
      hosts.forEach((host) => {
        Request.find({ hostId: host._id })
          .then((results) => {
            results.forEach((requestItem) => {
              if (requestItem.artistId.equals(artistId)) {
                host.isRequested = true;
              }
            });
          })
          .catch(next);
      });
      res.render('lists/host-list', { hosts });
    })
    .catch(next);
});

router.post('/host-list/:id', (req, res, next) => {
  const hostId = req.params.id;
  const { _id, email, artist } = req.session.currentUser;
  const request = {
    hostId,
    artistId: _id,
    artistEmail: email,
    bandName: artist.bandName,
    genre: artist.genre,
    status: 'pending'
  };
  Request.create(request)
    .then(() => {
      res.redirect('/lists/host-list');
    })
    .catch(next);
});

router.get('/artist-requests-list', (req, res, next) => {
  let isArtist = false;
  let isHost = false;
  if (req.session.currentUser.role === 'Artist') {
    isArtist = true;
  }
  if (req.session.currentUser.role === 'Host') {
    isHost = true;
  }
  User.find({ role: 'Host' })
    .then((users) => {
      const data = {
        users,
        isArtist,
        isHost
      };
      res.render('lists/artist-requests-list', data);
    })
    .catch(next);
});

// we are retrieving the artist info based on artist id but the host is logged in
router.get('/my-requests', (req, res, next) => {
  const { _id } = req.session.currentUser;
  Request.find({ hostId: _id })
    .populate('artistId')
    .then((requests) => {
      requests.forEach((request) => {
        if (request.status === 'accepted') {
          request.hideButtons = true;
        }
      });
      res.render('lists/host-requests-list', { requests });
    })
    .catch(next);
});

// we are retrieving host info based on host id but the artist is logged in
router.get('/my-requests-list', (req, res, next) => {
  const { _id } = req.session.currentUser;
  Request.find({ artistId: _id })
    .populate('hostId')
    .then((result) => {
      res.render('lists/artist-requests-list', { requests: result });
    })
    .catch(next);
});

router.post('/:id/accept', (req, res, next) => {
  const id = req.params.id;
  Request.findByIdAndUpdate(id, { status: 'accepted' }, { new: true })
    .then((result) => {
      res.redirect('/lists/my-requests');
    })
    .catch(next);
});

router.post('/:id/decline', (req, res, next) => {
  const id = req.params.id;
  Request.findByIdAndRemove(id)
    .then((result) => {
      res.redirect('/lists/my-requests');
    })
    .catch(next);
});

module.exports = router;
