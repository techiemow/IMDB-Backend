const ActorModel = require("../../Model/ActorsModel");
const MovieModel = require("../../Model/MovieModel"); // Import your MovieModel

// Helper function to generate a random six-digit number
const generateRandomTmdbId = () => {
    return Math.floor(100000 + Math.random() * 900000); // Generates a number between 100000 and 999999
};

const UpdateActor = async (req, res) => {
    try {
        const { name, gender, dob, bio, ActorImages, movies } = req.body; // Include movies in destructuring
        console.log('Received data:', req.body); // Log incoming data

        // Update the actor's information
        const actor = await ActorModel.findByIdAndUpdate(
            req.params.id,
            { name, gender, dob, bio, ActorImages },
            { new: true, runValidators: true }
        );

        if (!actor) {
            return res.status(404).json({ message: "Actor not found" });
        }

        // Update the movies array if provided
        if (movies && Array.isArray(movies)) {
            for (const movie of movies) {
                // Check if the movie with the provided tmdbId already exists
                let existingMovie = await MovieModel.findOne({ tmdbId: movie.tmdbId });
                
                if (existingMovie) {
                    // Update existing movie with the new actor reference
                    existingMovie.actors.addToSet(actor._id); // Prevent duplicate references
                    await existingMovie.save();
                } else {
                    // If the tmdbId doesn't exist, generate a random one
                    const randomTmdbId = generateRandomTmdbId();
                    
                    // Create a new movie with the generated tmdbId
                    existingMovie = new MovieModel({
                        name: movie.name,
                        releaseDate: movie.releaseDate,
                        plot: movie.plot,
                        movieImages: movie.movieImages,
                        tmdbId: randomTmdbId, // Use the random tmdbId
                        actors: [actor._id], // Add the actor as a reference
                        producer: movie.producer // Include producer if provided
                    });

                    await existingMovie.save(); // Save the new movie
                }
            }
        }
    
        console.log(actor ,"actor Updated ");
        
        res.json({ message: "Actor updated successfully", actor });
    } catch (error) {
        console.error('Error updating actor:', error.message); // Log error message
        res.status(500).json({ message: "Failed to update actor", error });
    }
};

module.exports = UpdateActor;
