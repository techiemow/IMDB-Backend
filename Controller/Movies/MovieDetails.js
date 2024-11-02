const { default: mongoose } = require("mongoose");
const MovieModel = require("../../Model/MovieModel");

const MovieDetails = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid movie ID' });
        }
        
        const movie = await MovieModel.findById(id).populate("actors").populate("producer");

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        console.log('Fetched movie:', movie); // Log the movie

        res.json(movie); // Send the movie data as a response
    } catch (error) {
        console.error("Error fetching movie details:", error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = MovieDetails;

