const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Actor Schema
const ActorSchema = new mongoose.Schema({
    name: {
      type: String,

    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      
    },
    dob: {
      type: Date,

    },
    bio: {
      type: String,
      
    }
  });

const ActorModel = mongoose.model("Actors", ActorSchema)


module.exports = ActorModel;