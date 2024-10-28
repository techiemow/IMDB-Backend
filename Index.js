const bodyParser = require("body-parser");
const express =  require("express")
const cors  = require("cors");
const app =  express();
const cookieParser = require("cookie-parser");
const connectdb = require("./DB/DB");
const Router = require("./Routes/Router");
require("dotenv").config();

app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(Router);


app.get("/" , (req,res)=>{
    res.send("WelCome to IMDB Website ");
})

 const port = 4000;
connectdb().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});