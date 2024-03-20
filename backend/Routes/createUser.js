const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = 'vnjkadfkjflkjdsljfaldjlfjdsljflkdjsklfjlak';


// Router for creating User
router.post('/createUser',
[
    body('name', 'Name Length must be greater than 5.').isLength({min:5}),
    body('email', 'Email is not valid.').isEmail(),
    body('password', 'Password Length must be greater than 5').isLength({min:5})
]
,async (req, res)=> {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const salt = await bcrypt.genSalt(12);
    const hashedPd = await bcrypt.hash(req.body.password, salt);
    try {
       await UserModel.create({
            name: req.body.name,
            location: req.body.location,
            email: req.body.email,
            password: hashedPd
        });
        res.json({
            success: true
        })
    } catch (error) {
        console.log('---- Error while creating User in createUser Route -------');
        console.log(error);
        res.json({
            success: false
        })
    }
});


//Router for Login User
router.post('/loginUser', 
[
    body('email', 'Email is not valid.').isEmail(),
    body('password', 'Password Length must be greater than 5.').isLength({min:5})
],
async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const inputEmail = req.body.email;
    try{
        const userData = await UserModel.findOne({"email": inputEmail});
        if(!userData) return res.status(400).json({success: false, msg: "Account Not Found"});

        

        const isAuthUser = await bcrypt.compare(req.body.password, userData.password);
        if(isAuthUser){
            const jwtData = {
                user: {
                    id: userData.id
                }
            }
            const authToken = jwt.sign(jwtData, jwtSecret);
            return res.status(200).json({success:true, msg: "Login Successfull", authToken: authToken});
        }
        return res.status(400).json({success: false, msg: "Password Incorrect"});
    }
    catch(error){
        res.json({
            success: false,
            msg: error.message
        });
    }
}
)

module.exports = router

