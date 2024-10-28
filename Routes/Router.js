const express = require("express");
const Router = express.Router();





const SignUp = require("../Controller/SignUp");
const Login = require("../Controller/Login");
const Search = require("../Controller/Movies/MovieSearch");




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


Router.post("/Search", Search)


module.exports = Router;