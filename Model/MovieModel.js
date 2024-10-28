const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MovieSchema = new Schema({
    name: { type: String, required: true },
  yearOfRelease: { type: Number},
  plot: { type: String },
  posterPath: { type: String, required: true },
  tmdbId: { type: Number, unique: true, required: true },
    actors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Actor' }],
    producer: { type: mongoose.Schema.Types.ObjectId, ref: 'Producer' }
  });


const MovieModel = mongoose.model('Movies', MovieSchema);

module.exports = MovieModel;