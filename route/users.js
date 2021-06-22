const Router = require('express').Router();
const User = require("../model/User");
const bcrypt = require('bcrypt')


// // add user
// export const addUser = (newUser)=>dispatch=>{
//     axios.post('/api/users/adduser' , newUser)
//     .then(res=>dispatch(getUsers()))
//     .catch(err=>console.log(err))
// }
// update user
Router.put("/updateuser/:id", async (req, res) =>{
    if (req.body._id === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try{
                const salt = 10 ;
                req.body.password = await bcrypt.hash(req.body.password, salt) ;
            }catch (err) {
                return res.status(500).json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body, 
            });
            res.status(200).json("Account has been updated");
        } catch (err) {
            return res.status(500).json(err);
        }

    }else {
        return res.status(403).json("You can update only your account!");
    }
})
// delete user
Router.delete("/deleteuser/:id", async (req, res) =>{
    if (req.body._id === req.params.id || req.body.isAdmin) {
        
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } catch (err) {
            return res.status(500).json(err);
        }

    }else {
        return res.status(403).json("You can delete only your account!");
    }
})
// get all users
Router.get("/getallusers", async (req, res) => {
    try {
        const users = await User.find() ;
        res.status(200).json(users)

    }catch (err) {
        res.status(500).json(err)
    }
})

// get user
Router.get("/getuser", async (req, res) =>{
    const userId = req.query.userId;
    const username = req.query.username ;
try {
    const user = userId 
    ? await User.findById(userId) 
    : await User.findOne({username: username});
    const {password, updatedAt, ...other} = user._doc
    res.status(200).json(other) ;

} catch (err) {
    res.status(500).json(err)
}
}
)

// get friends
Router.get("/friends/:userId", async (req, res)=>{
    try{
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followings.map(friendId=>{
                return User.findById(friendId)
            })
        )
        let friendList = [];
        friends.map(friend=>{
            const {_id,username,profilePicture} = friend ;
            friendList.push({_id,username,profilePicture});
        });
        res.status(200).json(friendList)

    }catch (err){
        res.status(500).json(err)
    }
})


// follow user
Router.put("/:id/follow", async (req, res) => {
    if (req.body._id !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body._id);
            if(!user.followers.includes(req.body._id)){
                await user.updateOne({ $push: { followers: req.body._id}});
                await currentUser.updateOne({ $push: { followings: req.params.id}});
                res.status(200).json("user has been followed") ;

            } else {
                res.status(403).json("You already follow this user")
            }

        } catch (err){
            res.status(500).json(err)
        }

    } else {
        res.status(403).json("you can't follow yourself")
    }
})
// unfollow user
Router.put("/:id/unfollow", async (req, res) => {
    if (req.body._id !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body._id);
            if(user.followers.includes(req.body._id)){
                await user.updateOne({ $pull: { followers: req.body._id}});
                await currentUser.updateOne({ $pull: { followings: req.params.id}});
                res.status(200).json("user has been unfollowed") ;

            } else {
                res.status(403).json("You don't follow this user")
            }

        } catch (err){
            res.status(500).json(err)
        }

    } else {
        res.status(403).json("you can't unfollow yourself")
    }
})





module.exports = Router

