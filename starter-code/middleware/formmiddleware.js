'use strict';

const formMiddleware = {};

formMiddleware.requireFields = (req, res, next) => {
  const { email, password, city, address, phoneNumber, roomCapacity, bandName, genre } = req.body;
  if (!email || !password || !city || !address || !phoneNumber || !roomCapacity || !bandName || !genre) {
    req.flash('validationError', 'Fields empty');
    return res.redirect(`/auth${req.path}`);
  }
  next();
};

module.exports = formMiddleware;
