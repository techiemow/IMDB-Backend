const mongoose =require("mongoose");

const Schema  = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    emailaddress:{
        type:String,
        required:true,
        unique:true,
       
    
    },
    phoneNumber:{
        type:Number,
        required:true,
    }
},{
    timestamps:true
})

const UserModel = mongoose.model("Registrations",UserSchema)

module.exports = {UserModel};