let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();
const { json } = require('body-parser');
const CryptoJS = require("crypto-js");
var key = "ASECRET";
let userSchema = require('../models/user.model');

//creating user
router.route('/create').post((req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    userSchema.findOne({email:email},(err,user) => {
        if(user){
            return res.json('emailexist');
        }else{
            const newuserdata = {
                name,
                email,
                password,
                role
            }
            const newUser = new userSchema(newuserdata);
            newUser.save()
            .then(() => {return res.json('user added')})
            .catch(err => res.status(400).json('Error: ' + err));
        }
    })
});

//checking user
router.route('/login').post((req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    
    userSchema.findOne({email:email},(err,user) => {
        if(user){
            if((CryptoJS.AES.decrypt((user.password),key)).toString(CryptoJS.enc.Utf8) === password){
                const secureUser = {
                    id:user._id,
                    name:user.name,
                    email:user.email,
                    role:user.role
                }
                return res.json({user:secureUser});
            }else{
                return res.json('pw not matched!.');
            }
        }else{
            return res.json('emailnotfound');
        }
    })
});

module.exports = router;