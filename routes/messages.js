const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messages');
const UserAuthentication = require("../middlewares/Auth")

router.post('/add-message',UserAuthentication.authenticate,messageController.addMessage);


module.exports =router