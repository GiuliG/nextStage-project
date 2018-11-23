'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get signup page for attendees
router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {
  const { email, password } = req.body;
  const user = {
    email,
    password,
    role: 'Attendee'
  };
  User.create(user)
    .then((user) => {
      console.log('created user');
      res.redirect('/');
    }
    )
    .catch(next);
});

// Get signup page for hosts
router.get('/signup-host', (req, res, next) => {
  res.render('auth/signup-host');
});

router.post('/signup-host', (req, res, next) => {
  const { email, password, city, address, phoneNumber, roomCapacity } = req.body;
  const user = {
    email,
    password,
    role: 'Host',
    host: {
      city,
      address,
      phoneNumber,
      roomCapacity
    }
  };
  User.create(user)
    .then((user) => {
      console.log('created user');
      res.redirect('/');
    }
    )
    .catch(next);
});

// Get signup page for performer
router.get('/signup-perform', (req, res, next) => {
  res.render('auth/signup-perform');
});

router.post('/signup-perform', (req, res, next) => {
  const { email, password, bandName, genre } = req.body;
  console.log(req.body);
  const user = {
    email,
    password,
    role: 'Artist',
    artist: {
      bandName,
      genre
    }
  };
  User.create(user)
    .then((user) => {
      console.log('created user');
      res.redirect('/');
    }
    )
    .catch(next);
});

module.exports = router;
