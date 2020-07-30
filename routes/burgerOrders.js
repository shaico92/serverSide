const express = require('express');
const router = express.Router({mergeParams : true});
const BurgerOrder = require('../models/burgerOrders');

let orders={};

router.get('/',(req,res)=>{
getBurgerOrders();
console.log('sucess')

res.send(orders);


});



getBurgerOrders=()=>{
    BurgerOrder.find({},(err , order )=>{
        if (err) {
                console.log("couldent fetch orders");
                            
        } else {
             
            orders={order}
        }
    })

    
}



module.exports = router;