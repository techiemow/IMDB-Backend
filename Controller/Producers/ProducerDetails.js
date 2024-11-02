const { default: mongoose } = require("mongoose");
const ProducerModel = require("../../Model/ProducersModel");

const ProducerDetails = async (req, res) => {
    try {
        const id = req.params.id;

        // Validate the ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid producer ID' });
        }

        const producer = await ProducerModel.findById(id)
            .populate('movies'); // Populate the movies field

        
    
            
        
            
        if (!producer) {
            return res.status(404).json({ message: 'Producer not found' });
        }
        res.json({message:"Updated successfully", success:true ,data:producer});
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = ProducerDetails;
