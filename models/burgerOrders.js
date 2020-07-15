let mongoose = require('mongoose');


const burgerOrderSchema = new mongoose.Schema({
    
     customer : {
         name : String,
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


const BurgerOrder = new mongoose.model('BurgerOrder',burgerOrderSchema);

module.exports = BurgerOrder;