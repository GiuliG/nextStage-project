const express = require('express');
const router = express.Router();

// Get signup page

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

module.exports = router;
