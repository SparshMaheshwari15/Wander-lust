const mongoose = require("mongoose");
// const initData = require("./data.js");
const initData=require("./newData.js")
const Listing = require("../models/listing.js");

main()
    .then((res) => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}
const initDB = async () => {
    await Listing.deleteMany({});
    // 669a590269a091bd9a80edbd is the id of the user with name admin
    // If there is a change in database then change the id
    initData.data=initData.data.map((obj)=>({...obj,owner:"669a590269a091bd9a80edbd"}))
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
};

initDB();
