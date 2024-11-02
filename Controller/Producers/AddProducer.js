const MovieModel = require("../../Model/MovieModel");
const ProducerModel = require("../../Model/ProducersModel");



const producerAddition = async (req, res) => {
  const { name, gender, dob, bio, ProducerImages, movies } = req.body;
  

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
  

  try {
    // Create an array to store existing movie IDs
    const existingMovieIds = [];

    for (const movie of movies) {
      const existingMovie = await MovieModel.findOne({ name: movie.name });

      if (existingMovie) {
        // If the movie already exists, push its ID to existingMovieIds
        existingMovieIds.push(existingMovie._id);
    
           
      } else {
        const tmdbId = await generateUniqueTmdbId(); 
        // If the movie does not exist, create a new movie document
        const newMovie = await MovieModel.create({
          name: movie.name,
          releaseDate: movie.releaseDate,
          plot: movie.plot,
          movieImages: movie.movieImages,
          tmdbId// Assume this is an array of image URLs
        });
        existingMovieIds.push(newMovie._id); // Push the new movie ID
      }
    }

    // Create a new producer with the associated movie IDs
    const newProducer = await ProducerModel.create({
      name,
      gender,
      dob,
      bio,
      ProducerImages,
      movies: existingMovieIds, // Associate the found or newly created movie IDs
    });

    
    res.status(201).json({ success: true, message: 'Producer added successfully', producer: newProducer });
  } catch (error) {
    console.error('Error adding producer:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = producerAddition;
