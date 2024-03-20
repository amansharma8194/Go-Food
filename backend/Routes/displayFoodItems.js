const express = require('express');
const router = express.Router();


router.post('/foodData', (req, res)=>{
    try {
        res.send([global.foodCategory, global.foodData]);
    } catch (error) {
        res.json({success: false});
    }
})

module.exports = router