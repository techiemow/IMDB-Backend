const MovieModel = require("../../Model/MovieModel");


const DisplayMovies = async(req, res) =>{
    try {
        const movies = await MovieModel.find().sort({ createdAt: -1 }).limit(10); 
        return res.status(200).json({ success: true, data: movies });
      } catch (error) {
        console.error('Error fetching recently added movies:', error);
        return res.status(500).json({ success: false, message: 'Failed to fetch movies.' });
      }
}

module.exports = DisplayMovies;