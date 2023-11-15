const Message = require('../models/messages');
const User = require('../models/user');
const sequelize = require("../util/database");
const Group = require("../models/groups");
const groupDetails = require("../models/usergroups");


exports.createGroup = async (req,res,next)=>{
    try {
        console.log(req.body.groupname)
        const groupname = req.body.groupname;
        const userid = req.user.id;
        console.log(groupname,userid);
        await Group.create({groupname: groupname, userId: userid})
        .then(result =>{
            let groupid = result.id;
            let groupname = result.groupname;
            let userName = req.user.name;
            console.log(groupid, groupname, userName);
            groupDetails.create({admin: true, groupname: groupname, name: userName, userId: userid, groupId: groupid})
            .then(result => {
                res.status(200).json({result, message:'Group Successfully Created'});
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(err=>{
            console.log("error" , err)
        })
    } catch (error) {
        console.log("error occured in group creating")
                res.status(500).json({
                error: error
            })
    }
}


exports.getGroups = async(req,res,next)=>{
    try{
        let id = req.user.id;
        console.log("Group id is",id);
        const data = await groupDetails.findAll({where: {userId: id}})
        console.log(data);
        res.status(200).json({data});
    }
    catch(err){
        res.status(500).json({message: 'Not Able to getGroups'});
    }
    
}