const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const Schema = mongoose.Schema ;

const PostSchema = new Schema(
    {
        userId: {
            type: String ,
            required: true
        },
        desc: {
            type: String ,
            max: 500
        },
        img: {
            type: String
        },
        likes: {
            type: Array ,
            default: []
        },
        postedBy :{
            type:ObjectId,
            ref:"User"
         }
    },

     
{ timestamps: true }
);

module.exports=mongoose.model("Post", PostSchema)