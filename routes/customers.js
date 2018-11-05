//const customer  = require('../models/customers');
const {Customer,validateCustomer}  = require('../models/customer');
const mongoose =  require('mongoose');
const express = require ('express');
const router  = express.Router();


router.get('/', async (req, res)=> {
    const customers = await Customer.find().sort('name');
    res.send(customer);
});


router.get('/:id', async (req, res)=> {
    const customer = await Customer.findById(req.param.id);
    
    if (!customer) {
        res.status(404).send('Id not found');
        return;
    }
        res.send(customer);
});


router.post('/', async (req, res)=> {
    
    const result = validateCustomer(req.body);
    
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    } 
    
    let customer =  new Customer( {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
     
    customer = await Customer.save();
    
    res.send(customer);
});



router.put('/:id', async (req, res) => {

    /* const result = validateCustomer(req.body);
if(result.error){
    res.status(400).send(result.error.details[0].message);
    return;
} */
    
    const customer = await Customer.findByIdAndUpdate(
        req.params.id, 
        {name: req.body.name, 
        phone:req.body.phone, 
        isGold:req.body.isGold},
        {new : true});
    
    if (!customer) {
        res.status(404).send('Id not found');
        return;
    }
    
    res.send(customer);
});

router.delete('/:id', async (req, res) => {

    const customer = await Customer.findByIdAndRemove(req.params.id);
    
    if (!customer){
    res.status(404).send('Id not found');
    return;
    } 
    
    res.send(customer);
});



module.exports = router;