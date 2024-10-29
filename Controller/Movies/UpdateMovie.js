const MovieModel = require( "../../Model/MovieModel");

const UpdateMovie = async(req,res) =>{
    const { id } = req.params;
    const updatedData = req.body;
     console.log(id);
     
    try {
      const updatedMovie = await MovieModel.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
     console.log(updatedMovie);
     
      if (!updatedMovie) {
        return res.status(404).json({ success: false, message: 'Movie not found' });
      }
  
      return res.status(200).json({ success: true, message: 'Movie updated successfully', movie: updatedMovie });
    } catch (error) {
      console.error('Error updating movie:', error);
      return res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

module.exports = UpdateMovie;