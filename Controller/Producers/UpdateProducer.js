const ProducerModel = require("../../Model/ProducersModel");
const MovieModel = require("../../Model/MovieModel");

const UpdateProducer = async (req, res) => {
  const { id } = req.params; // Get producerId from URL parameters
  const { name, gender, dob, bio, ProducerImages, movies } = req.body;

  try {
    // Find the producer by ID and update their details (excluding movies temporarily)
    const producer = await ProducerModel.findByIdAndUpdate(
      id,
      { name, gender, dob, bio, ProducerImages },
      { new: true }
    );

    if (!producer) {
      return res.status(404).json({ success: false, message: 'Producer not found.' });
    }

    // Update each movie's details using the provided movie IDs
    for (const movie of movies) {
      const { _id, ...updateData } = movie; // Destructure the ID and other update data
      
      // Update the movie by ID
      const updatedMovie = await MovieModel.findByIdAndUpdate(
        _id,
        updateData,
        { new: true } // Option to return the updated document
      );

      // If the movie is not found, you may choose to handle it as needed
      if (!updatedMovie) {
        console.error(`Movie with ID ${_id} not found.`);
      }
    }

    // Return the updated producer details
    return res.status(200).json({
      success: true,
      message: 'Producer and movies updated successfully.',
      producer,
    });
  } catch (error) {
    console.error('Error updating producer:', error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

module.exports = UpdateProducer;
