require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./util/database');
const bodyParser = require('body-parser');


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

var cors = require('cors');
app.use(cors());

//models
const User = require('./models/user');
const Message = require('./models/messages')
const Group = require('./models/groups');
const userGroup = require('./models/usergroups');
const GroupMessage = require('./models/groupmessage');

//routes
const userRoutes = require('./routes/user');
app.use('/user',userRoutes);
const messageRoutes = require('./routes/messages');
app.use('/message', messageRoutes);
const groupRoutes = require('./routes/groups');
app.use('/groups',groupRoutes);
const contentRoutes = require('./routes/groupmessage');
app.use('/content', contentRoutes);
const forgotpasswordRoutes = require('./routes/resetpassword');
app.use('/password',forgotpasswordRoutes)



//relationships
User.hasMany(Message);
Message.belongsTo(User);


User.belongsToMany(Group, {through: userGroup});
Group.belongsToMany(User, {through: userGroup});

User.hasMany(GroupMessage);
GroupMessage.belongsTo(User);



sequelize.sync().then(() =>{
    app.listen(process.env.PORT || 4000);
}).catch(err =>{
    console.log(err);
})