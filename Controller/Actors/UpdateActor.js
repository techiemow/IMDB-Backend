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
                if (movie._id) { // Check if movie ID is provided
                    // Update existing movie details by ID
                    const existingMovie = await MovieModel.findById(movie._id);
                    if (existingMovie) {
                        // Update existing movie details
                        existingMovie.name = movie.name || existingMovie.name;
                        existingMovie.releaseDate = movie.releaseDate || existingMovie.releaseDate;
                        existingMovie.plot = movie.plot || existingMovie.plot;
                        existingMovie.movieImages = movie.movieImages || existingMovie.movieImages;
                        existingMovie.producer = movie.producer || existingMovie.producer;
                        
                        // Save updated movie
                        await existingMovie.save();
                    } else {
                        // If the movie with the given ID doesn't exist, handle it as needed
                        return res.status(404).json({ message: `Movie with ID ${movie._id} not found` });
                    }
                } else {
                    // If no ID is provided, treat it as a new movie
                    const randomTmdbId = generateRandomTmdbId();
                    
                    const newMovie = new MovieModel({
                        name: movie.name,
                        releaseDate: movie.releaseDate,
                        plot: movie.plot,
                        movieImages: movie.movieImages,
                        tmdbId: randomTmdbId, // Use the random tmdbId
                        actors: [actor._id], // Add the actor as a reference
                        producer: movie.producer // Include producer if provided
                    });

                    await newMovie.save(); // Save the new movie
                }
            }
        }
    
        console.log(actor, "actor Updated");
        
        res.json({ message: "Actor updated successfully", actor });
    } catch (error) {
        console.error('Error updating actor:', error.message); // Log error message
        res.status(500).json({ message: "Failed to update actor", error });
    }
};

module.exports = UpdateActor;
