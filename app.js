const express = require('express');

const sqlite3 = require('sqlite3').verbose();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const log = require('clg-color')
const burgerOrderRoutes = require('./routes/burgerOrder');

let dbStatus = false;


const app = express();


const connectoToDB= ()=>{
    mongoose.connect('mongodb://localhost:27017/burgersDB',{useNewUrlParser: true ,useUnifiedTopology: true},(err)=>{

    if (err) {
        console.log(err )
        console.log('========================================')
        console.log('please run mongod via cmd')
    } else {
        log.success('mongo is ready');
        dbStatus =true;
    }

});
}



connectoToDB();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use('/',burgerOrderRoutes);








    
    app.listen(5000,()=>{
        console.log("Burger server is up")
    })







  