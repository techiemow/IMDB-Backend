const ActorModel = require("../../Model/ActorsModel");

const UpdateActor = async (req, res) => {
    try {
        const { name, gender, dob, bio, ActorImages } = req.body;
        console.log('Received data:', req.body); // Log incoming data

        const actor = await ActorModel.findByIdAndUpdate(
            req.params.id,
            { name, gender, dob, bio, ActorImages },
            { new: true, runValidators: true } 
        );

        if (!actor) {
            return res.status(404).json({ message: "Actor not found" });
        }

        res.json({ message: "Actor updated successfully", actor });
    } catch (error) {
        console.error('Error updating actor:', error.message); // Log error message
        res.status(500).json({ message: "Failed to update actor", error });
    }
};


module.exports = UpdateActor;
