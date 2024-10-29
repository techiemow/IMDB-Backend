const express = require("express");
const Router = express.Router();





const SignUp = require("../Controller/SignUp");
const Login = require("../Controller/Login");

const authToken = require("../Middleware/auth");
const AddNewMovie = require("../Controller/Movies/AddMovie");
const DisplayMovies = require("../Controller/Movies/DisplayMovie");
const AddNewActor = require("../Controller/Actors/NewActor");
const DisplayActor = require("../Controller/Actors/DisplayActor");
const producerAddition = require("../Controller/Producers/AddProducer");
const DisplayProducer = require("../Controller/Producers/DisplayProducer");
const MovieDetails = require("../Controller/Movies/MovieDetails");
const ActorDetails = require("../Controller/Actors/ActorDetails");
const ProducerDetails = require("../Controller/Producers/ProducerDetails");
const UpdateMovie = require("../Controller/Movies/UpdateMovie");
const UpdateActor = require("../Controller/Actors/UpdateActor");
const UpdateProducer = require("../Controller/Producers/UpdateProducer");






Router.post("/Signup", SignUp);
Router.post("/Login", Login);
Router.post("/Logout", (req, res) => {
    res.clearCookie("token", {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
    });
    res.json({
        message: "Logged out successfully",
        success: true,
    });
});


// Router.post("/Search", Search)

Router.post("/AddMovie", authToken, AddNewMovie)
Router.get("/RecentMovies", DisplayMovies )
Router.get("/movie/:id", MovieDetails)
Router.put("/UpdateMovie/:id",authToken,UpdateMovie)

Router.post("/AddNewActor",authToken, AddNewActor)
Router.get("/RecentActors", DisplayActor)
Router.get("/actor/:id", ActorDetails)
Router.put("/UpdateActor/:id",authToken,UpdateActor)

Router.post("/AddNewProducer", authToken, producerAddition )
Router.get("/RecentProducers", DisplayProducer )
Router.get("/producer/:id",ProducerDetails)
Router.put("/UpdateProducer/:id",authToken,UpdateProducer)



module.exports = Router;