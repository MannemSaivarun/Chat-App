const express = require('express');

const router = express.Router();

const middlewareAuthentication = require('../middlewares/Auth');
const contentController = require('../controllers/groupmessage');


router.post('/add-participant/:id', middlewareAuthentication.authenticate, contentController.addParticipation);
router.get('/grpparticipants/:id', middlewareAuthentication.authenticate, contentController.getgroupParticipants);
router.post('/makeuseradmin/:id',middlewareAuthentication.authenticate, contentController.makeUserAdmin);
router.post('/removeuser/:id',middlewareAuthentication.authenticate, contentController.removeUser);
router.post('/sendmessage/:id', middlewareAuthentication.authenticate,contentController.sendGroupMessage);

router.get('/getgrpmessages/:id', middlewareAuthentication.authenticate, contentController.getGrpMessages);
module.exports = router;