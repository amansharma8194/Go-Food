const express = require('express');
const OrderModel = require('../models/Order');
const router = express.Router();


router.post('/orderData', async (req, res) => {
    let data = {
        "date": req.body.date,
        "orders": req.body.orderData
    }
    const eId = await OrderModel.findOne({"email": req.body.email});
    if(eId === null){
        try {
            await OrderModel.create({
                "email": req.body.email,
                "orderData": [data]
            });
            res.json({success: true});
        } catch (error) {
            console.log("------------ Error while create Order DATA -------");
            res.send(error.message);
            res.json({success: false});
        }
    }
    else{
        try {
            await OrderModel.findOneAndUpdate({"email": req.body.email}, { $push: {orderData: data}});
            res.json({success: true});
        } catch (error) {
            console.log("----- Error while updating order data ------");
            res.send(error.message);
            res.json({succuss: false});
        }
    }
    
});

router.post('/myOrdersData', async(req, res)=>{
    try {
        const resp = await OrderModel.findOne({"email": req.body.email});
        res.json(resp.orderData);
    } catch (error) {
        res.json({success: false});
        res.send("Server Error", error.message);
    }
});

module.exports = router;