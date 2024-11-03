const MovieModel = require("../../Model/MovieModel");
const ProducerModel = require("../../Model/ProducersModel");

const producerAddition = async (req, res) => {
  const { name, gender, dob, bio, ProducerImages, movies } = req.body;

  console.log("Incoming data:", { name, gender, dob, bio, ProducerImages, movies });

  // Generate a unique tmdbId for each movie if it doesn't already exist
  const generateUniqueTmdbId = async () => {
    let tmdbId;
    let isUnique = false;
    while (!isUnique) {
      tmdbId = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
      const existingMovie = await MovieModel.findOne({ tmdbId });
      if (!existingMovie) isUnique = true;
    }
    return tmdbId;
  };

  try {
    // Check if movies array is provided
    if (!movies || !Array.isArray(movies)) {
      return res.status(400).json({ success: false, message: "Movies data must be an array." });
    }

    // Step 1: Create the new producer without movies initially
    const newProducer = await ProducerModel.create({
      name,
      gender,
      dob,
      bio,
      ProducerImages,
      movies: [], // Start with an empty array
    });

    const movieIds = [];

    // Step 2: Add each movie, associating the producer ID if creating a new movie
    for (const movie of movies) {
      const existingMovie = await MovieModel.findOne({ name: movie.name });

      if (existingMovie) {
        movieIds.push(existingMovie._id); // Add existing movie's ID
      } else {
        // Generate a unique tmdbId
        const tmdbId = await generateUniqueTmdbId();

        // Create a new movie and associate the producer ID
        const newMovie = await MovieModel.create({
          name: movie.name,
          releaseDate: movie.releaseDate,
          plot: movie.plot,
          movieImages: movie.movieImages,
          tmdbId,
          producer: newProducer._id, // Associate producer ID
        });

        movieIds.push(newMovie._id); // Add new movie's ID
      }
    }

    // Step 3: Update the producer with the associated movie IDs
    newProducer.movies = movieIds;
    await newProducer.save();

    res.status(201).json({
      success: true,
      message: "Producer added successfully",
      producer: newProducer,
    });
  } catch (error) {
    console.error("Error adding producer:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = producerAddition;
