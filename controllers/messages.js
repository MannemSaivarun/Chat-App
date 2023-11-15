const Message = require('../models/messages');
const User = require('../models/user');
const sequelize = require("../util/database");

exports.addMessage = async(req,res,next)=>{
    try {
        const message = req.body.message;
        const name = req.user.name;
        console.log('message path is called', req.body ,req.user,req.user.name);
        await Message.create({name:name,message:message, userId: req.user.id})
        const details = {name:name,message:message}
        res.status(200).json({details:details});


    } catch (error) {
        console.log("error occured")
        res.status(500).json({

                error: error
            })
    }
    
}

exports.getMessages = async(req,res,next)=>{
    try {
        console.log("user is ");
        const messages = await Message.findAll()
        console.log("messages",messages)
        res.status(200).json({messages: messages});
    } catch (error) {
        console.log("error at getting all categories")
        res.status(500).json({error: error})   
    }
}