const { Router } = require('express');

const router = require('express').Router() ;
const User = require('../model/User') ;
const bcrypt = require('bcrypt');
const {validator, loginRules, registerRules} = require('../middleware/bodyValidator') ;
const jwt = require('jsonwebtoken') ;
const isAuth = require('../middleware/isAuth') ;





router.post('/register', registerRules(), validator, async (req,res)=>{
const {username, email, password} = req.body
try{
let user = await User.findOne({email})
if(user)
{
    return res.status(400).send({msg: "user already exist"})
}
user = new User({
    username
    , email,
    password
})
// hash the password
const salt = 10
const hashedpassword = await bcrypt.hash(password, salt) ;
user.password = hashedpassword
await user.save()
const payload ={
    _id: user._id
}
const token = await jwt.sign(payload, process.env.secretOrkey)
res.status(200).send({msg: "user saved", user, token})

}catch(error)
{
    res.status(500).send({msg: "error server"})
    

}

    res.send({msg: "register"})
})







router.post('/login', async (req,res)=>{
    const {email, password} = req.body
    try{
        const user = await User.findOne({email})
        if(!user)
        {
           return res.status(404).send({msg: "user not found"}) 
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
        {
            return res.status(400).send({msg: "wrong password"}) 
        }
        const payload ={
            _id: user._id
        }
        const token = await jwt.sign(payload, process.env.secretOrkey)
        res.status(200).send({msg: "login success", user: convertUser(user), token})
    }

    
    

    catch(error)
    {
       return res.status(500).send({msg: "error server"})
       console.log(error)
       
       
    }
    
}) 

router.get("/me", isAuth, (req,res)=>{
    res.status(200).send({user: req.user})
    
})

module.exports = router 

const convertUser = ({username, email, _id}) =>({
    username ,
    email,
    _id,
}) 
















