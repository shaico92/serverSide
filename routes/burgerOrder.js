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
  const ingridinetsCalculator=(obj)=>{
    let price =0;
    for (const key in obj.ings) {
        
         let   count=obj.ings[key];
      

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
        totalPrice : +ingridinetsCalculator(req.body)

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