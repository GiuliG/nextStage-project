// Band name: string
// Genre: string, required, enum[‘Rock’, ‘Jazz’, ...]
// Social Media Links: link
// Attendee
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  bandName: {
    type: String
  },
  genre: {
    type: String,
    required: true,
    enum: ['Rock', 'Jazz', 'Hip-Hop', 'Pop', 'Country', 'Classic', 'Electronic', 'Blues', 'RnB', 'Experimental']
  },
  socialMediaLink: String
});

module.exports = userSchema;
