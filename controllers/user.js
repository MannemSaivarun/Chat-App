const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

function isstringinvalid(string){
    if(string===undefined || string===0){
        return true
    }else{
        return false
    }
}
//<---------signup------------->
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


    
//<----------login---------->

function generateAcessToken(id,name){
    return jwt.sign({userId : id, name : name },process.env.SECRET_TOKEN_KEY)
}    

exports.loginUser = async (req,res)=>{
        try{
            const {email,password} = req.body;
            // console.log(req.body)
            if(isstringinvalid(email)||isstringinvalid(password)){
                console.log('Email or password is missing')
               return res.status(400).json({message:'Email or password is missing',success:false})
            }
            const user = await User.findAll({where : {email}})
            // const userId = user[0].id;
            // console.log("id:",userId);
            
            if(user.length>0){
                const storedHash = user[0].password
                bcrypt.compare(password, storedHash, (err, result) => {
                    console.log("ENTERED")
                    if (err) {
                      // Handle the error
                      res.status(202).json({success:false, message:"User doesnot exist"})
                    } else if (result === true) {
                      // Passwords match, grant access to the user
                      res.status(200).json({success:true, message:"User loged in succefully", token: generateAcessToken(user[0].id, user[0].name)})
                    } else {
                      // Passwords do not match, deny access
                      res.status(201).json({success:false, message:"password doesnot matched"})
                    }
                });
            }else{
                res.status(202).json({success:false, message:"User doesnot exist"})
            }
               
        }
        catch(err){
            res.status(500).json({
                success:false,
                message:err
            })
        }
    }
    