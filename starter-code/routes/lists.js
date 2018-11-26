'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/host-list', (req, res, next) => {
  User.find({ role: 'Host' })
    .then((users) => {
      res.render('lists/host-list', { users });
    })
    .catch(next);
});

module.exports = router;
