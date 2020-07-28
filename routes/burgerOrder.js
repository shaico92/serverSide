const express = require('express');
const router = express.Router({mergeParams : true});
const BurgerOrder = require('../models/burgerOrders')
const BurgerIngredients = require('../models/burgerIngredients');


router.use((req, res, next)=> {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
        return res.status(200).json({});
    };
    next();
  });
  const addingOrderToDB = (req) =>{

    const reqObjToAdd = {

        customer :{
            name :req.body.customer.name,
            email: req.body.customer.email,
            address: {
                street:req.body.customer.address.street,
                zipcode:req.body.customer.address.zipcode,
                country:req.body.customer.address.country,
            }
        },
        
        ingridients : req.body.ings,
        price : req.body.price

    }

 const smth=  new BurgerOrder(reqObjToAdd);
    smth.save((err)=>{
            if (err) {
                console.log(err)
            }else{
                    console.log(reqObjToAdd)
                console.log('saved to db')
                
            }
    });


    





}

router.post('/contact-data',(req,res)=>{

    
    
    addingOrderToDB(req);
    
    
    res.send('added do data base')


    // const burgerOrder = new BurgerOrder({

    // })

});












module.exports =router;