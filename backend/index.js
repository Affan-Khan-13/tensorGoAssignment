import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

mongoose.connect('mongodb://localhost:27017')
.then(()=> console.log("Connected to database Successfully !!!"))
.catch((err)=> console.log(err));

app.get('/', (req, res) =>{
    res.send("Home Page");
})

app.listen(3001, (req, res)=>{
    console.log("Server Running on port 3001")
})