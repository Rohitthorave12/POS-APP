const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("❌ MONGO_URL is missing from .env file!");
        }

        const conn = await mongoose.connect("mongodb://127.0.0.1:27017/pos", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`✅ MongoDB connected: ${conn.connection.host}`);

        // Enable Mongoose Debugging
        mongoose.set("debug", true);

        // Event Listeners for better tracking
        mongoose.connection.once("open", () => console.log("🔗 Database connection is open!"));
        mongoose.connection.on("error", (err) => console.error("❌ Database connection error:", err));

    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};

module.exports = connectDb;
