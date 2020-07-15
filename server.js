const express = require('express');
const { log } = require('console');
const sqlite3 = require('sqlite3').verbose();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const burgerOrderRoutes = require('./routes/burgerOrder');



const app = express();



mongoose.connect('mongodb://localhost:27017/burgersDB',{useNewUrlParser: true ,useUnifiedTopology: true});



app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use('/checkout',burgerOrderRoutes);








app.listen(5000,()=>{
    console.log("Burger server is up")
})




  