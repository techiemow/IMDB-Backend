const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MovieSchema = new Schema({
  name: {
      type: String,
      required: true
  },
  releaseDate: {
      type: Date,
      required: true
  },
  plot: {
      type: String,
  },
  movieImages: {
      type: Array,
      required: true
  },
  tmdbId: {
      type: Number,
      unique: true,
  },
  actors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Actor' }], // References to the actors in the movie
  producer: { type: mongoose.Schema.Types.ObjectId, ref: 'Producer'} // Reference to the producer of the movie
});



const MovieModel = mongoose.model('Movie', MovieSchema);

module.exports = MovieModel;