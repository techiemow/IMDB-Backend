const ProducerModel = require("../../Model/ProducersModel");




const UpdateProducer =  async(req,res) =>{
    const { id } = req.params; // Get producerId from URL parameters
    const {
      name,
      gender,
      dob,
      bio,
      ProducerImages,
      movies,
    } = req.body; // Destructure the data from the request body
  
    
  
    try {
      // Find the producer by ID and update their details
      const ProducerChanges = await ProducerModel.findByIdAndUpdate(
        id,
        {
          name,
          gender,
          dob,
          bio,
          ProducerImages,
          movies,
        },
        { new: true } // Option to return the updated document
      );
  
   
      
      // If the producer is not found
      if (!ProducerChanges ) {
        return res.status(404).json({ success: false, message: 'Producer not found.' });
      }
  
      // Return the updated producer details
      return res.status(200).json({
        success: true,
        message: 'Producer updated successfully.',
        producer: ProducerChanges ,
      });
    } catch (error) {
      console.error('Error updating producer:', error);
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  


}

module.exports = UpdateProducer