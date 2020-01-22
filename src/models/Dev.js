const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  type: {
    enum: ['Point'],
    type: String,
    required: true,
  },
  coordinates: [Number],
});

const DevSchema = new mongoose.Schema({
  name: String,
  username: String,
  techs: [String],
  bio: String,
  avatar_url: String,
  location: {
    type: LocationSchema,
    required: true,
    index: '2dsphere',
  },
});

module.exports = mongoose.model('devs321', DevSchema);
