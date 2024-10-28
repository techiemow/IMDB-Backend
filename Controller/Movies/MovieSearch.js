// Import necessary modules
const ActorModel = require("../../Model/ActorsModel");
const MovieModel = require("../../Model/MovieModel");
const ProducerModel = require("../../Model/ProducersModel");
require("dotenv").config();
const axios = require("axios");

const TMDB_API_KEY = process.env.TMDB_API_KEY;

// Search function to find and save movie data
const Search = async (req, res) => {
    const { query } = req.body;

    try {
        // Search for the movie in TMDB
        const tmdbResponse = await axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
                api_key: TMDB_API_KEY,
                query: query,
            },
        });

        const moviesData = tmdbResponse.data.results; // Corrected to tmdbResponse
        const savedMovies = [];
    
        for (const movie of moviesData) {
            // Fetch detailed movie information, including cast and crew
            const movieDetailResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_API_KEY}&append_to_response=credits`);
            const movieDetail = movieDetailResponse.data;

            // Check if the movie already exists in the database by tmdbId
            let existingMovie = await MovieModel.findOne({ tmdbId: movieDetail.id });

            if (!existingMovie) {
                // Process cast (actors)
                const actorPromises = movieDetail.credits.cast.map(async (actorData) => {
                    let actor = await ActorModel.findOne({ name: actorData.name });
                    if (!actor) {
                        actor = new ActorModel({
                            name: actorData.name,
                            gender: actorData.gender ? (actorData.gender === 1 ? 'Female' : 'Male') : null, // TMDB gender: 1 = Female, 2 = Male
                            dob: actorData.birthday ? new Date(actorData.birthday) : null, // Actor's birthday
                            bio: actorData.biography || '', // Actor's bio
                        });
                        await actor.save();
                    }
                    return actor._id; // Return the saved actor's ID
                });

                // Process crew (producers)
                const producerPromises = movieDetail.credits.crew
                    .filter(crewMember => crewMember.job === "Producer") // Filter for producers
                    .map(async (producerData) => {
                        let producer = await ProducerModel.findOne({ name: producerData.name });
                        if (!producer) {
                            producer = new ProducerModel({
                                name: producerData.name,
                                gender: producerData.gender ? (producerData.gender === 1 ? 'Female' : 'Male') : null, // TMDB gender
                                dob: producerData.birthday ? new Date(producerData.birthday) : null, // Producer's birthday
                                bio: producerData.biography || '', // Producer's bio
                            });
                            await producer.save();
                        }
                        return producer._id; // Return the saved producer's ID
                    });

                // Wait for all actors and producers to be saved
                const actors = await Promise.all(actorPromises);
                const producers = await Promise.all(producerPromises);

                // Extract and validate the year of release
                const yearOfRelease = movieDetail.release_date ? new Date(movieDetail.release_date).getFullYear() : null;
                if (yearOfRelease && !isNaN(yearOfRelease)) {
                    // Create and save the new movie
                    const newMovie = new MovieModel({
                        name: movieDetail.title,
                        yearOfRelease: yearOfRelease,
                        plot: movieDetail.overview,
                        posterPath: `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`,
                        tmdbId: movieDetail.id,  // Set tmdbId from the TMDB response
                        actors: actors, // Set the actors' IDs
                        producer: producers.length > 0 ? producers[0] : null, // Assuming one producer, use the first one
                    });

                    await newMovie.save();
                    savedMovies.push(newMovie);
                } else {
                    console.warn(`Skipping movie due to invalid year of release: ${movieDetail.title}`);
                }
            } else {
                // If the movie already exists, you can choose to update it or skip it
                savedMovies.push(existingMovie); // Or handle as you prefer
            }
        }

        res.status(200).json({
            message: 'Movies processed successfully',
            movies: savedMovies,
        });
    } catch (error) {
        console.error('Error fetching movie:', error);
        res.status(500).json({ message: 'Error fetching movie', error: error.message });
    }
};

module.exports = Search;

