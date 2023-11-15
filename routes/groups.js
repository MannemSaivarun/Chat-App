const express = require('express');
const router = express.Router();
const UserAuthentication = require("../middlewares/Auth");
const groupController = require("../controllers/groups");

router.post('/create-group', UserAuthentication.authenticate, groupController.createGroup);
router.get('/get-groups',UserAuthentication.authenticate, groupController.getGroups);

module.exports =router;