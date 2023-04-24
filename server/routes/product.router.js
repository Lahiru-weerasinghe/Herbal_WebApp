let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();
const { json } = require('body-parser');
  let productsSchema = require('../models/product.model');

//getting products
router.route('/').get((req,res)=>{
    productsSchema.find((err,data)=>{
        if(!err){
            return res.json(data);
        }else{
            return res.json({error:err});
        }
    })
})

//getting related products
router.route('/getProducts/:product').get((req,res)=>{
    const product = req.params.product;
    productsSchema.find({name:{ $regex: '.*' + product + '.*' }},(err,productsdata) =>{
        if(productsdata.length > 0){
            return res.json({products:productsdata});
        }else{
            return res.json('products404');
        }
    })
})

//getting related products
router.route('/getbyuser/:uid').get((req,res)=>{
    const uid = req.params.uid;
    productsSchema.find({uid:uid},(err,productsdata) =>{
        if(productsdata.length > 0){
            return res.json({products:productsdata});
        }else{
            return res.json('products404');
        }
    })
})

//getting product by id
router.route('/get/:id').get((req,res)=>{
    const productbyid = req.params.id;
    productsSchema.findOne({_id:productbyid},(err,productdata) =>{
        if(productdata){
            return res.json({product:productdata});
        }else{
            return res.json('product404');
        }
    })
})

//creating product
router.route('/create').post((req,res)=>{
    const name = req.body.name;
    const price = req.body.price;
    const desc = req.body.desc;
    const uid = req.body.uid;
    const qnty = req.body.qnty;

    try{
        const newproductdata = {
            name,
            price,
            desc,
            uid,
            qnty
        }
        const newProduct = new productsSchema(newproductdata);
        newProduct.save()
        .then(() => {return res.json(newproductdata)})
        .catch(err => res.status(400).json('Error: ' + err));
    }catch(e){
        return res.json({err:e});
    }
});

//update product
router.route('/updatepr/:id').put((req,res) =>{
    const name = req.body.name;
    const desc = req.body.desc;
    const price = req.body.price;
    const uid = req.body.uid;
    const qnty = req.body.qnty;

    const updatedProduct = {
        name,
        price,
        desc,
        uid,
        qnty
    }
    
    productsSchema.findByIdAndUpdate(req.params.id, {
        $set: updatedProduct
    },(error,data) => {
        if(error){
            return res.json({error:error});
        }else{
            console.log(data)
            return res.json({data:data});
        }
    })
})

//update product
router.route('/updateqnty/:id').put((req,res) =>{
    const qnty = req.body.qnty;

    const updatedProduct = {
        qnty
    }
    
    productsSchema.findByIdAndUpdate(req.params.id, {
        $set: updatedProduct
    },(error,data) => {
        if(error){
            return res.json({error:error});
        }else{
            console.log(data)
            return res.json({data:data});
        }
    })
})

router.delete('/delete/:pid', (req, res, next) => {
    productsSchema.deleteMany({ _id: req.params.pid }).then(function(){
        console.log("product deleted"); // Success
        return res.json({product:"delted"});
    }).catch(function(error){
        console.log(error); // Failure
        return res.json({product:"error"});
    }); 
});

module.exports = router;