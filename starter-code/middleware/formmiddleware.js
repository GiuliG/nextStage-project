'use strict';

const formMiddleware = {};

formMiddleware.requireFieldsAttendee = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    req.flash('validationError', 'Fields empty');
    return res.redirect(`/auth${req.path}`);
  }
  next();
};

formMiddleware.requireFieldsHost = (req, res, next) => {
  const { email, password, city, address, phoneNumber, roomCapacity } = req.body;

  if (!email || !password || !city || !address || !phoneNumber || !roomCapacity) {
    req.flash('validationError', 'Fields empty');
    return res.redirect(`/auth${req.path}`);
  }
  next();
};

formMiddleware.requireFieldsArtist = (req, res, next) => {
  const { email, password, bandName, genre } = req.body;

  if (!email || !password || !bandName || !genre) {
    req.flash('validationError', 'Fields empty');
    return res.redirect(`/auth${req.path}`);
  }
  next();
};

module.exports = formMiddleware;
