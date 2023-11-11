const Message = require('../models/messages');
const User = require('../models/user');
const sequelize = require("../util/database");

exports.addMessage = async(req,res,next)=>{
    try {
        const message = req.body.message;
        console.log('message path is called', req.body ,req.user);
        await Message.create({message:message, userId: req.user.id})
        res.status(200).json({message:message});


    } catch (error) {
        console.log("error occured")
        res.status(500).json({
                error: error
            })
    }
    
}

exports.getMessages = async(req,res,next)=>{
    try {
        console.log("user is ",req.user.id);
        const messages = await Message.findAll({where :{userId : req.user.id}})
        console.log("messages",messages)
        res.status(200).json({messages: messages});
    } catch (error) {
        console.log("error at getting all categories")
        res.status(500).json({error: error})   
    }
}