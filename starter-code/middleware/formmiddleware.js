'use strict';

const formMiddleware = {};

formMiddleware.requireFields = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    req.flash('validationError', 'Fields empty');
    return res.redirect(`/auth${req.path}`);
  }
  next();
};

module.exports = formMiddleware;
