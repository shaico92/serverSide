const express = require('express');
const router = express.Router({mergeParams : true});

const BurgerIngredients = require('../models/burgerIngredients');


let currentIngredientsID = null;

let ingridients = null;
router.use((req, res, next)=> {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  const ingridinetsCalculator=(obj)=>{
    let price =0;
    for (const key in obj.ingridients) {
        
         let   count=obj.ingridients[key];
      

      switch (key) {
          case 'salad':
              if (count>0) {
                 count= count*0.5
              }
              price=price+count;
              break;

              case 'cheese':
                if (count>0) {
                    count= count*1.32
                 }
                 price=price+count;
                break;
                case 'meat':
                    if (count>0) {
                        count= count*4.52
                     }
                     price=price+count;
              break;
              case 'bacon':
                if (count>0) {
                    count= count*2.15
                 }
                 price=price+count;
              break; 
          default:
              break;
      }

    }
    return price;
}
  
  const addingridientsToDB=()=>{
      
    BurgerIngredients.remove({},(err)=>{
        if (err) {
            console.log(err)
        }else{
            console.log('deleted ingridients table')
        }
    })
    const obj = {
        
        ingridients : {
            salad: 0,
            bacon : 0,
            cheese : 0,
            // pickels : 1,
            meat : 1
        },
        totalPrice : null
    }
   obj.totalPrice=  ingridinetsCalculator(obj);
  console.log(obj.totalPrice)

    const newObj = new BurgerIngredients(obj);
    newObj.save(()=>{
        
        console.log('creating ingredients table')
    });
    currentIngredientsID=   newObj._id;
}
const  getIngridinets =()=>{
    
    BurgerIngredients.findById(currentIngredientsID,(err, ings)=> {
        if (err) {
            console.log(err);
            
        } else {
            
            
            ingridients= ings;
            ingridinetsCalculator(ingridients);
            
            
        }
    })
    
}
addingridientsToDB();
console.log('current id in db is =='+currentIngredientsID)
 









router.get('/',(req,res)=>{
    
    getIngridinets();
    
    
                res.send(ingridients)    
    
                
    
    
})


router.get('/ssss',(req,res)=>{
    
    
    ingridinetsCalculator();
                res.send('lol')    
    
                
    
    
})



module.exports =router;