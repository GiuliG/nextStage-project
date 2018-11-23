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
    password
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
  const { email, password, role } = req.body;
  const user = {
    email,
    password,
    role
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

module.exports = router;
