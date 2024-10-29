const MovieModel = require("../../Model/MovieModel");

const MovieDetails = async (req, res) => {
    try {
        const movieId = req.params.id;
        // Use the correct field names: 'actors' and 'producer'
    
        
        const movie = await MovieModel.findById(movieId)
            .populate('actors')  
            .populate('producer'); 
     
        
            
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.json(movie); // Send the movie data as a response
    } catch (error) {
        console.error("Error fetching movie details:", error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = MovieDetails;
