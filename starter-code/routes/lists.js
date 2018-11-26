'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authMiddleware = require('../middleware/authmiddleware');

router.get('/host-list', authMiddleware.requireUserArtist, (req, res, next) => {
  User.find({ role: 'Host' })
    .then((users) => {
      res.render('lists/host-list', { users });
    })
    .catch(next);
});

module.exports = router;
