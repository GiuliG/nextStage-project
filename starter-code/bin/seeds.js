'use strict';
const mongoose = require('mongoose');
const Client = require('../models/user');

mongoose.connect('mongodb://localhost/nextstage', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});
