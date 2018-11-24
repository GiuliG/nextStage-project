'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');

/* GET users page.
router.get('/profiles/host-profile', (req, res, next) => {
  res.render('profiles/host-profile');
}); */

router.get('/profiles/host-profile/:id', (req, res, next) => {
  const id = req.params.id;
  User.findById(id)
    .then((result) => {
      console.log(result);
      res.render('profiles/host-profile', { users: result });
    })
    .catch(next);
});

module.exports = router;
