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
        const { name, releaseDate, plot, movieImages, actors, producer } = req.body;
    
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
          producer: producerId, // Store producer ID
          actors: actorIds, // Store array of actor IDs
        });
    
        await newMovie.save();
    
        // Update existing producer with the new movie
        await ProducerModel.updateOne(
          { _id: producerId },
          { $addToSet: { movies: newMovie._id } } // Add the movie ID to the movies array
        );
    
        // Update existing actors with the new movie
        await ActorModel.updateMany(
          { _id: { $in: actorIds } },
          { $addToSet: { movies: newMovie._id } } // Add the movie ID to the movies array
        );
    
        return res.status(201).json({ success: true, message: 'Movie added successfully!',data: newMovie });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = AddNewMovie;
