const express = require('express');
const router = express.Router({mergeParams : true});
const BurgerOrder = require('../models/burgerOrders')


router.use((req, res, next)=> {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


router.post('/',(req,res)=>{

    
    console.log(req.body)
    addingOrderToDB(req);
    
    



    // const burgerOrder = new BurgerOrder({

    // })

});

router.get('/',(req,res)=>{
    res.send('success send email')
})




const addingOrderToDB = (req) =>{

    const reqObjToAdd = {

        customer :{name : req.body.customer.name ,
             address : req.body.customer.address},
        ingridients : req.body.ings,
        price : req.body.price

    }

 const smth=  new BurgerOrder(reqObjToAdd);
    smth.save((err)=>{
            if (err) {
                console.log(err)
            }else{

                console.log('saved to db')
                console.log(smth)
            }
    });


    





}





module.exports =router;