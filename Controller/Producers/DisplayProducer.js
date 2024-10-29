const ProducerModel = require("../../Model/ProducersModel");

const DisplayProducer = async(req, res) =>{
    try {
        const producers = await ProducerModel.find().sort({ createdAt: -1 }).limit(10); 
        return res.status(200).json({ success: true, data: producers });
      } catch (error) {
        console.error('Error fetching recently added movies:', error);
        return res.status(500).json({ success: false, message: 'Failed to fetch movies.' });
      }
}

module.exports = DisplayProducer;