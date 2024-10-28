const mongoose = require('mongoose');
const ProducerSchema = new mongoose.Schema({
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

const ProducerModel = mongoose.model('Producers', ProducerSchema);

module.exports = ProducerModel;