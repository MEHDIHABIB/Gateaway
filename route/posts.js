const router = require('express').Router();
const Post = require('../model/Post') ;
const User = require('../model/User') ;

// create a post
router.post("/addpost", async (req, res) => {
    const newPost = new Post(req.body)
    try{
        const savedPost = await newPost.save() ;
        res.status(200).json(savedPost) ;

    }catch (err) {
        res.status(500).json(err) ;
    }
}) ;

// update a post
router.put("/updatepost/:id", async (req, res)=> {
    try {
    const post = await Post.findById(req.params.id) ;
    if(post.userId === req.body.userId){
        await post.updateOne({$set: req.body}) ;
        res.status(200).json("The post has been updated")

    } else {
        res.status(403).json("You can update only your post")
    }
}catch (err){
    res.status(500).json(err) ;
}
})
// delete a post
router.delete("/deletepost/:id", async (req, res)=> {
    try {
    const post = await Post.findById(req.params.id) ;
    if(post.userId === req.body.userId){
        await post.deleteOne() ;
        res.status(200).json("The post has been deleted")

    } else {
        res.status(403).json("You can delete only your post")
    }
}catch (err){
    res.status(500).json(err) ;
}
})

// remove post by id
router.delete("/deleteposts/:_id" ,async (req, res)=>{
    try{
        const {_id} = req.params
        await Post.deleteOne({_id})
        res.status(200).json("The post has been removed")

    }catch (err){
        res.status(500).json(err);
    }
})
    


// like / dislike a post
router.put("/:id/like", async (req, res) =>{
    try {
        const post = await Post.findById(req.params.id) ;
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({ $push: {likes: req.body.userId}});
            res.status(200).json("The post has been liked")
        }else {
            await post.updateOne({ $pull: {likes: req.body.userId}});
            res.status(200).json("The post has been disliked")
        }

    }catch (err){
        res.status(500).json(err)
    }
})
// get a post
router.get("/getpost/:postId", async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        console.log(post)
        res.status(200).json(post)

    }catch (err){
        res.status(500).json(err)
    }
})

// get all posts
router.get("/getallposts", async (req, res) => {
    try {
        const posts = await Post.find() ;
        res.status(200).json(posts)

    }catch (err) {
        res.status(500).json(err)
    }
})

// get user's all posts
router.get("/profile/:username", async (req, res) => {
    try {
        const user = await User.findOne({username: req.params.username})
        const posts = await Post.find({userId: user._id}) ;
        res.status(200).json(posts);
        
    }catch (err){
        res.status(500).json(err)
    }
})
// get timeline posts
router.get("/timeline/:userId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId) ;
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
               return Post.find({ userId: friendId });
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts))
        
    }catch (err){
        res.status(500).json(err)
    }
})


module.exports = router

// const requireLogin = require("../middleware/isAuth");

// router.delete('/:id',requireLogin,(req,res)=>{
//     Post.findOne({_id:req.params.id})
//     .populate("postedBy","_id")
//     .exec((err,post)=>{
//         if(err || !post){
//             return res.status(422).json({error:err})
//         }
//         if(post.postedBy._id.toString() === req.user._id.toString()){
//               post.remove()
//               .then(result=>{
//                   res.json(result)
//               }).catch(err=>{
//                   console.log(err)
//               })
      
//      }
//     })
// })