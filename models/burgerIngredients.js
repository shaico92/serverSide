const mongoose = require('mongoose');


const burgerIngredientsSchema = new mongoose.Schema({
    
    ingridients : {
        salad: Number,
        bacon : Number,
        cheese : Number,
        // pickels : 1,
        meat : Number
    },
    totalPrice : Number
});


const BurgerIngredients = new mongoose.model('Burger_DefaultIngredients',burgerIngredientsSchema);

module.exports = BurgerIngredients;