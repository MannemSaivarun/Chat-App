const User = require('../models/user');
const bcrypt = require("bcrypt");
// const jwt = require('jsonwebtoken');
require('dotenv').config();

function isstringinvalid(string){
    if(string===undefined || string===0){
        return true
    }else{
        return false
    }
}
exports.addUser = async (req,res,next)=>{
        try {
            console.log('path is called', req.body);
            const name = req.body.name;
            const email = req.body.email;
            const phonenumber = req.body.phonenumber;
            const password = req.body.password;
            
            //console.log("post request");
            if(isstringinvalid(name)|| isstringinvalid(email) || isstringinvalid(password) || isstringinvalid(phonenumber)){
                return res.status(400).json({err:"bad parameters. Something is missing"})
            }
            const existingUser = await User.findAll({ where: { email } });
            if (existingUser.length>0) {
                console.log("user already exists", existingUser)
                return res.status(400).json({ error: 'User already exists' });
              }
            const saltrounds = 10 
            bcrypt.hash(password,saltrounds,async(err,hash)=>{
                await User.create({name: name, email: email, phonenumber:phonenumber ,password: hash})
                res.status(201).json({message:"succesfully created new user"});
            })
            
    
        } catch (error) {
                console.log("error occured")
                res.status(500).json({
                error: error
            })
        }
    }