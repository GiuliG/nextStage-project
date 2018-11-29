'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const authMiddleware = require('../middleware/authmiddleware'); // Middleware
const formMiddleware = require('../middleware/formmiddleware');

// Get signup page for attendees
router.get('/signup', authMiddleware.requireAnon, (req, res, next) => {
  const data = {
    messages: req.flash('validationError')
  };
  res.render('auth/signup', data);
});

router.post('/signup', authMiddleware.requireAnon, formMiddleware.requireFieldsAttendee, (req, res, next) => {
  const { email, password } = req.body;

  const user = {
    email,
    password,
    role: 'Attendee'
  };
  // Check if email exists
  User.findOne({ email })
    .then((user) => {
      if (user) {
        req.flash('validationError', 'This email already exists, please try again');
        return res.redirect('/auth/signup');
      }
      // if everything is fine (no empty fields & user not exists), encrypt password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      // create new user in users collection
      User.create({
        email,
        password: hashedPassword,
        role: 'Attendee'
      })
        .then((newUser) => {
          req.session.currentUser = newUser;
          res.redirect('/');
        })
        .catch(next);
    })
    .catch(next);
});

// Get signup page for hosts
router.get('/signup-host', authMiddleware.requireAnon, (req, res, next) => {
  const data = {
    messages: req.flash('validationError')
  };
  res.render('auth/signup-host', data);
});

router.post('/signup-host', authMiddleware.requireAnon, formMiddleware.requireFieldsHost, (req, res, next) => {
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
  User.findOne({ email })
    .then((user) => {
      if (user) {
        req.flash('validationError', 'This email has already been taken, please try again');
        return res.redirect('/auth/signup-host');
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      User.create({
        email,
        password: hashedPassword,
        role: 'Host',
        host: {
          city,
          address,
          phoneNumber,
          roomCapacity
        }
      })
        .then((newUser) => {
          req.session.currentUser = newUser;
          res.redirect('/');
        })
        .catch(next);
    })
    .catch(next);
});

// Get signup page for performer
router.get('/signup-perform', authMiddleware.requireAnon, (req, res, next) => {
  const data = {
    messages: req.flash('validationError')
  };
  res.render('auth/signup-perform', data);
});

router.post('/signup-perform', authMiddleware.requireAnon, formMiddleware.requireFieldsArtist, (req, res, next) => {
  const { email, password, bandName, genre } = req.body;
  const user = {
    email,
    password,
    role: 'Artist',
    artist: {
      bandName,
      genre
    }
  };
  User.findOne({ email })
    .then((user) => {
      if (user) {
        req.flash('validationError', 'This email has already been taken, please try again');
        return res.redirect('/auth/signup-artist');
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      User.create({
        email,
        password: hashedPassword,
        role: 'Artist',
        artist: {
          bandName,
          genre
        }
      })
        .then((newUser) => {
          req.session.currentUser = newUser;
          res.redirect('/');
        })
        .catch(next);
    })
    .catch(next);
});

// login form
router.get('/login', authMiddleware.requireAnon, (req, res, next) => {
  const data = {
    messages: req.flash('validationError')
  };
  res.render('auth/login', data);
});

router.post('/login', authMiddleware.requireAnon, formMiddleware.requireFieldsAttendee, (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        req.flash('validationError', 'Email or password incorrect');
        return res.redirect('/auth/login');
      }
      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        res.redirect('/');
      } else {
        req.flash('validationError', 'Email or password incorrect');
        res.redirect('/auth/login');
      }
    })
    .catch(next);
});

router.post('/logout', authMiddleware.requireUser, (req, res, next) => {
  delete req.session.currentUser;
  res.redirect('/auth/login');
});

module.exports = router;
