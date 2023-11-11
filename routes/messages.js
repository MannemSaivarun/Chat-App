const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messages');
const UserAuthentication = require("../middlewares/Auth")

router.post('/add-message',UserAuthentication.authenticate,messageController.addMessage);
router.get('/get-messages',UserAuthentication.authenticate,messageController.getMessages);

module.exports =router