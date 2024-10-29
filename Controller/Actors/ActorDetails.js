const { default: mongoose } = require("mongoose");
const ActorModel = require("../../Model/ActorsModel");


const ActorDetails = async(req,res) =>{
    try {
        const id = req.params.id;
    
        // Validate the ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: 'Invalid actor ID' });
        }
    
        const actor = await ActorModel.findById(id).populate('movies');
    
        console.log(actor);
    
        if (!actor) {
          return res.status(404).json({ message: 'Actor not found' });
        }
        res.json(actor);
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Server error' });
      }
}

module.exports = ActorDetails