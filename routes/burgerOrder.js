const express = require('express');
const router = express.Router({mergeParams : true});
const BurgerOrder = require('../models/burgerOrders')
const BurgerIngredients = require('../models/burgerIngredients');

let currentIngredientsID = null;

let ingridients = null;
router.use((req, res, next)=> {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


  function addingridientsToDB(){
    BurgerIngredients.remove({},(err)=>{
        if (err) {
            console.log(err)
        }else{
            console.log('deleted ingridients table')
        }
    })
    const obj = {
        
        ingridients : {
            salad: 1,
            bacon : 1,
            cheese : 1,
            // pickels : 1,
            meat : 1
        },
        totalPrice : 8.47
    }
    const newObj = new BurgerIngredients(obj);
    newObj.save(()=>{
        
        console.log('creating ingredients table')
    });
    currentIngredientsID=   newObj._id;
}

addingridientsToDB();
console.log('current id in db is =='+currentIngredientsID)












router.post('/',(req,res)=>{

    
    
    addingOrderToDB(req);
    
    
    res.send('added do data base')


    // const burgerOrder = new BurgerOrder({

    // })

});

router.get('/',(req,res)=>{
    
    getIngridinets();
    
    res.send(ingridients)
    
})


const getIngridinets =()=>{
    BurgerIngredients.findById(currentIngredientsID,(err, ings)=> {
        if (err) {
            console.log(err);
            
        } else {
            
            ingridients = ings;
            
            ;
            
            
        }
    })
}

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
                
            }
    });


    





}





module.exports =router;