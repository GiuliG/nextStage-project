'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
  User.findOne({ email })
    .then((user) => {
      if (user) {
      // req.flash('Error', 'User already taken');
        return res.redirect('/auth/signup');
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      User.create({
        email,
        password: hashedPassword,
        role: 'Attendee'
      })
        .then((newUser) => {
          // req.session.currentUser = newUser;
          res.redirect('/');
        })
        .catch(next);
    })
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

// login form
router.get('/login', (req, res, next) => {
  res.render('auth/login');
});

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        // req.flash('Error', 'User name or password incorrect');
        console.log('here');
        return res.redirect('/auth/login');
      }
      if (bcrypt.compareSync(password, user.password)) {
        // req.session.currentUser = user;
        res.redirect('/');
      } else {
        console.log('there');
        res.redirect('/auth/login');
      }
    })
    .catch(next);
});

module.exports = router;
