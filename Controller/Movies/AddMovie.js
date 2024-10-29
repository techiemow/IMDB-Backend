const ActorModel = require("../../Model/ActorsModel");
const MovieModel = require("../../Model/MovieModel");
const ProducerModel = require("../../Model/ProducersModel");


const findOrCreateActor = async (actorData) => {
    const existingActor = await ActorModel.findOne({
      name: actorData.name,
      gender: actorData.gender,
      dob: actorData.dob,
    });
  
    if (existingActor) {
      return existingActor._id; // Return existing actor ID
    } else {
      const newActor = new ActorModel(actorData);
      await newActor.save();
      return newActor._id; // Return new actor ID
    }
  };
  
  // Helper function to find or create a producer
  const findOrCreateProducer = async (producerData) => {
    const existingProducer = await ProducerModel.findOne({
      name: producerData.name,
      gender: producerData.gender,
      dob: producerData.dob,
    });
  
    if (existingProducer) {
      return existingProducer._id; // Return existing producer ID
    } else {
      const newProducer = new ProducerModel(producerData);
      await newProducer.save();
      return newProducer._id; // Return new producer ID
    }
  };


  const AddNewMovie = async (req, res) => {
    try {
        const { name, releaseDate, plot, movieImages, actors, producer, tmdbId } = req.body;

        // Check if a movie with the same tmdbId exists
        const existingMovie = await MovieModel.findOne({ tmdbId });
        if (existingMovie) {
            return res.status(400).json({ success: false, message: 'Movie with this tmdbId already exists.' });
        }

        // Find or Create Producer
        const producerId = await findOrCreateProducer(producer);

        // Find or Create Actors
        const actorPromises = actors.map(actor => findOrCreateActor(actor));
        const actorIds = await Promise.all(actorPromises);

        // Create Movie
        const newMovie = new MovieModel({
            name,
            releaseDate,
            plot,
            movieImages,
            tmdbId,
            producer: producerId,
            actors: actorIds,
        });

        await newMovie.save();

        // Update existing producer with the new movie
        await ProducerModel.updateOne(
            { _id: producerId },
            { $addToSet: { movies: newMovie._id } }
        );

        // Update existing actors with the new movie
        await ActorModel.updateMany(
            { _id: { $in: actorIds } },
            { $addToSet: { movies: newMovie._id } } // Assuming each actor can have multiple movies
        );

        res.status(201).json({ success: true, message: 'Movie added successfully!' });
    } catch (error) {
        console.error('Error adding new movie:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};
module.exports = AddNewMovie;
