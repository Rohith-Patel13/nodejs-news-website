const express = require("express")
const mongoose = require("mongoose")
const UserRoutes = require("./routes/users")
const morgan = require("morgan")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan("dev")); // Added morgan for logging HTTP requests



app.listen(4596,async()=>{
    console.log("Server Connected to given Port")
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error.message)
    }
});

app.use("/api/users",UserRoutes);


app.get("*",async(requestObject,responseObject)=>{
    console.log("Endpoint doesnot exist")
    responseObject.status(404).send("Endpoint doesnot exist")
})
