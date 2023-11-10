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

//routes
const userRoutes = require('./routes/user');
app.use('/user',userRoutes);
const messageRoutes = require('./routes/messages');
app.use('/message', messageRoutes);


//relationships
User.hasMany(Message);
Message.belongsTo(User);




sequelize.sync().then(() =>{
    app.listen(process.env.PORT || 4000);
}).catch(err =>{
    console.log(err);
})