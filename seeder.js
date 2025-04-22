const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDb = require("./config/config");
const Items = require("./models/itemModel");  
const items = require("./utils/data");        
dotenv.config();

const startSeeding = async () => {
    try {
        await connectDb();
        console.log("Connected to DB ✅");

        await Items.deleteMany();
        console.log("Existing items cleared 🗑️");

        const itemsData = await Items.insertMany(items);
        console.log("📦 Inserted items:", JSON.stringify(itemsData, null, 2));

        console.log("🚀 All items added successfully!");
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding data:", error);
        process.exitCode = 1;
    }
};

startSeeding();
