const {body, validationResult} = require('express-validator');

const registerRules = ()=> [
    body("username", "username is required").notEmpty(),
    body("email", "invalid email").isEmail(),
    body("password", "password must contain at least 6 characters").isLength({
        min: 6 ,
        max: 20 ,
    }),
]


const loginRules = ()=> [
    body('email', "invalid email").isEmail(),
    body('password', "password must contain at least 6 characters").isLength({
        min: 6 ,
        max: 20 ,
    }),
]

const validator = (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array().map((el)=> ({
            msg: el.msg
        })),
    }) ;
    }
    next() ;
}

module.exports = {
    validator ,
    registerRules ,
    loginRules
}


