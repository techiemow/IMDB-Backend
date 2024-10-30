const ActorModel = require("../../Model/ActorsModel");
const MovieModel = require("../../Model/MovieModel");
const ProducerModel = require("../../Model/ProducersModel");

const UpdateMovie = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    // Create a new array to hold the actor IDs
    const updatedActors = [];

    // Loop through the actors from the request data
    for (const actor of updatedData.actors) {
      // Check if the actor already exists
      let existingActor = await ActorModel.findOne({ name: actor.name, dob: actor.dob });

      if (!existingActor) {
        // Create a new actor if not found
        existingActor = await ActorModel.create({
          name: actor.name,
          gender: actor.gender,
          dob: actor.dob,
          bio: actor.bio,
          ActorImages: actor.ActorImages || [],
        });
      } else {
        // If the actor exists, push the movie ID to their movies array if it isn't already there
        if (!existingActor.movies.includes(id)) {
          existingActor.movies.push(id);
          await existingActor.save(); // Save the updated actor document
        }
      }

      // Push the actor's ID to the updatedActors array
      updatedActors.push(existingActor._id);
    }

    // Check if the producer already exists
    let existingProducer = await ProducerModel.findOne({ name: updatedData.producer.name, dob: updatedData.producer.dob });

    if (!existingProducer) {
      // Create a new producer if not found
      existingProducer = await ProducerModel.create({
        name: updatedData.producer.name,
        gender: updatedData.producer.gender,
        dob: updatedData.producer.dob,
        bio: updatedData.producer.bio,
      });
    }

    // Update the movie document
    const updatedMovie = await MovieModel.findByIdAndUpdate(
      id,
      {
        name: updatedData.name,
        releaseDate: updatedData.releaseDate,
        plot: updatedData.plot,
        movieImages: updatedData.movieImages,
        tmdbId: updatedData.tmdbId,
        actors: updatedActors, // Add the updated actors array
        producer: existingProducer._id, // Set the producer's ID
      },
      { new: true, runValidators: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }

    // Prepare the response object
    return res.status(200).json({ success: true, message: 'Movie updated successfully', movie: updatedMovie });
  } catch (error) {
    console.error('Error updating movie:', error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = UpdateMovie;
