const ActorModel = require('../../Model/ActorsModel'); // Adjust path as necessary
const MovieModel = require('../../Model/MovieModel');
 // Ensure you have this imported

// Helper function to generate a unique 6-digit number
const generateUniqueTmdbId = async () => {
  let tmdbId;
  let isUnique = false;

  while (!isUnique) {
    // Generate a random number between 100000 and 999999
    tmdbId = Math.floor(100000 + Math.random() * 900000);

    // Check if this tmdbId already exists in the Movie collection
    const existingMovie = await MovieModel.findOne({ tmdbId });
    if (!existingMovie) {
      isUnique = true; // Found a unique tmdbId
    }
  }

  return tmdbId;
};

const AddNewActor = async (req, res) => {
  const { name, gender, dob, bio, ActorImages, movies } = req.body;

  try {
    // Find existing actor by name
    const existingActor = await ActorModel.findOne({ name });

    if (existingActor) {
      return res.status(400).json({ success: false, message: 'Actor already exists' });
    }

    // Prepare movies to add
    const newMovies = [];
    for (const movie of movies) {
      // Check if movie already exists
      const existingMovie = await MovieModel.findOne({ name: movie.name });
      
      // If movie doesn't exist, create it
      if (!existingMovie) {
        const tmdbId = await generateUniqueTmdbId(); // Generate a unique tmdbId

        const newMovie = new MovieModel({
          name: movie.name,
          releaseDate: movie.releaseDate,
          plot: movie.plot,
          movieImages: movie.movieImages,
          tmdbId, // Use the newly generated tmdbId
        });

        await newMovie.save();
        newMovies.push(newMovie._id); // Push the ID of the new movie
      } else {
        newMovies.push(existingMovie._id); // Push the existing movie ID
      }
    }

    // Create a new actor
    const newActor = new ActorModel({
      name,
      gender,
      dob,
      bio,
      ActorImages,
      movies: newMovies // Associate unique movies with the actor
    });

    const savedActor = await newActor.save();
    
    res.status(201).json({ success: true, message: 'Actor created successfully', data: savedActor });
  } catch (error) {
    console.error('Error creating actor:', error);
    res.status(500).json({ success: false, message: 'Error creating actor', error: error.message });
  }
};

module.exports = AddNewActor;
