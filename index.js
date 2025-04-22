const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/config.js");

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// Test route
app.use('/api/items',require("./routes/itemRoutes.js"))
app.use('/api/users',require("./routes/userRoutes.js"))
app.use('/api/bills',require("./routes/billsRoutes.js"))


// Connect to DB and start server
connectDb()
    .then(() => {
        app.listen(port, () => console.log(`🚀 Server running on port ${port}!`));
    })
    .catch((error) => {
        console.error("❌ Database connection failed:", error);
        process.exit(1);
    });


