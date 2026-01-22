const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));

//Routes
app.get("/",(req,res)=>{
    res.send("Health Report API Running");
});

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server is Running on PORT:${PORT}`);
});
