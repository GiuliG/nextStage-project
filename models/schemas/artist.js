const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const artistSchema = new Schema({
  bandName: {
    type: String
  },
  genre: {
    type: String,
    required: true,
    enum: ['rock', 'jazz', 'hip-hop', 'pop', 'country', 'metal', 'classic', 'electronic', 'blues', 'rnb']
  },
  socialMediaLink: String
});

module.exports = artistSchema;
