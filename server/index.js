const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors')

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5500;

//use cors
app.use(cors())

//import routes
const TodoItemRoute = require('./routes/todoItemsRoutes');

app.use('/', TodoItemRoute);




//connect to mongodb
console.log(process.env.DB_CONNECT)
mongoose.connect(process.env.DB_CONNECT)
.then(()=> {
    console.log("Connected to MongoDB")
}).catch(err => console.log(err))


//add port and connect to the server
app.listen(PORT, ()=> console.log("Server connected"));