const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Actor Schema
const ActorSchema = new Schema({
  name: {
      type: String,
      required: true
  },
  gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true
  },
  dob: {
      type: Date,
      required: true
  },
  bio: {
      type: String,
  },
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }] // References to the movies the actor has acted in
});
const ActorModel = mongoose.model("Actors", ActorSchema)


module.exports = ActorModel;