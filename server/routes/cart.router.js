let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();
const { json } = require('body-parser');
  let cartSchema = require('../models/cart.model');


//getting cart product by id
router.route('/get/:id').get((req,res)=>{
    const productbyuid = req.params.id;
    cartSchema.find({uid:productbyuid},(err,productdata) =>{
        if(productdata){
            return res.json({product:productdata});
        }else{
            return res.json('product404');
        }
    })
})

//delete cart after finished the payment
router.delete('/delete/:uid', (req, res, next) => {
    cartSchema.deleteMany({ uid: req.params.uid }).then(function(){
        console.log("cart deleted"); // Success
        return res.json({cart:"empty"});
    }).catch(function(error){
        console.log(error); // Failure
        return res.json({cart:"error"});
    }); 
});


//creating product
router.route('/create').post((req,res)=>{
    const uid = req.body.uid;
    const pid = req.body.pid;
    const qnty = req.body.qnty;
    try{
        const cartplus = {
            uid,
            pid,
            qnty
        }
        const cartplusdata = new cartSchema(cartplus);
        cartplusdata.save()
        .then(() => {return res.json('cart added')})
        .catch(err => res.status(400).json('Error: ' + err));
    }catch(e){
        return res.json({err:e});
    }
});


module.exports = router;