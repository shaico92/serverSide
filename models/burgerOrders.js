const mongoose = require('mongoose');


const burgerOrderSchema = new mongoose.Schema({
    
     customer : {
         name : String,
         email : String,
         address : {
             street : String,
             zipcode : Number,
             country : String
         }
     },
    ingridients : {
        salad: Number,
        bacon : Number,
        cheese : Number,
        // pickels : 1,
        meat : Number
    },
    totalPrice : Number
});


const BurgerOrder = new mongoose.model('Burger_Order',burgerOrderSchema);

module.exports = BurgerOrder;