const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Actor Schema
const ActorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  ActorImages: {
    type: [String], // Specify type as String if storing image URLs
  },
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }] // References to the movies the actor has acted in
});

// Register the model with a consistent name
const ActorModel = mongoose.model('Actor', ActorSchema); // Use a singular name

module.exports = ActorModel;
