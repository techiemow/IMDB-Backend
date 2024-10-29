const ActorModel = require("../../Model/ActorsModel");


const DisplayActor = async(req,res) =>{
    try {
        const actors = await ActorModel.find().sort({ createdAt: -1 }).limit(10); 
        return res.status(200).json({ success: true, data: actors });
      } catch (error) {
        console.error('Error fetching recently added movies:', error);
        return res.status(500).json({ success: false, message: 'Failed to fetch movies.' });
      }
}

module.exports = DisplayActor