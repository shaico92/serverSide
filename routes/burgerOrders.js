const express = require('express');
const router = express.Router({mergeParams : true});
const BurgerOrder = require('../models/burgerOrders');

let orders={};

router.get('/',(req,res)=>{
    getBurgerOrders();
    if (Object.keys(orders).length>0) {
        console.log('sucess')
        getBurgerOrders();

        res.send(orders);        
    }else{
        
        res.redirect('/orders');        
    }
    



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