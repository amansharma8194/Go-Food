const mongoose = require('mongoose');
require('dotenv').config()
const dbURL = `mongodb+srv://${process.env.DATABASE_CLUSTER_USERNAME}:${process.env.DATABASE_CLUSTER_PASSWORD}@cluster0.ojmvvpq.mongodb.net/GoFood?retryWrites=true&w=majority&appName=Cluster0`;

const mongoDB = async () => {
    try {
        await mongoose.connect(dbURL);
        console.log("---Database Connected---");
        const foodItemsFD = await mongoose.connection.db.collection("FoodData");
        const foodCatFD = await mongoose.connection.db.collection("FoodCategory");

        foodCatFD.find({}).toArray()
        .then(resp => {
            console.log('------Data Fetched from FoodCategory collection -------');
            global.foodCategory = resp;
        })
        .catch(err => {
            console.log('-------Error while fetchind data from FoodCategory ----------');
            console.log(err);
            console.log('-----------------------');
        })
        
        foodItemsFD.find({}).toArray()
        .then(resp => {
            console.log('-------Data Fetched from FoodData--------');
            global.foodData = resp;
        })
        .catch(err => {
            console.log('---Error while fetching data from FoodData---', err, '------');
        });
    } catch (error) {
        console.error("---Error in DB connection---", error);
    }
}

module.exports = mongoDB;
