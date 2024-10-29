const mongoose = require('mongoose');
const Schema =  mongoose.Schema;


const ProducerSchema = new Schema({
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
  ProducerImages:{
    type:Array
  },
  bio: {
      type: String,
  },
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }] // References to the movies produced by the producer
})

const ProducerModel = mongoose.model('Producers', ProducerSchema);

module.exports = ProducerModel;