const mongoose = require('mongoose');

const Schema = mongoose.Schema ;

const userschema = new Schema({
    username : {
        type: String ,
        required: true ,
        min: 3,
        max: 20 ,
        unique: true

    }, 
    password : {
        type: String ,
        required: true ,
        
    },
    email : {
        type: String ,
        required: true ,
        max: 50,
        unique: true
    },
    profilePicture : {
        type: String,
        default: "" 

    },
    coverPicture : {
        type: String,
        default: "" 
    },
    followers : {
        type: Array ,
        default: []
    },
    followings : {
        type: Array ,
        default: []
    },
    isAdmin: {
        type: Boolean ,
        default: false
    },
    desc : {
        type: String ,
        max: 50
    },
    from : {
        type: String,
        max: 20
    },
    destination : {
        type: String,
        max: 20
    },
    airline : {
        type: String,
        max: 20
    },
    relationship : {
        type: Number ,
        enum: [1,2,3]
    }



},
{ timestamps: true }
);

module.exports=mongoose.model("user", userschema)