import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import passport from "./utils/passport.js"
import session from 'express-session'
import dotenv from "dotenv";


import userRoutes from "./routes/userRoute.js";
import usageDetailsRoutes from "./routes/usageRoute.js";
import cummulativeRoutes from "./routes/cummulativeRoute.js";
import invoiceRoutes from "./routes/invoiceRoute.js"
import { generateInvoices } from "./controllers/InvoiceController.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this line
app.use(morgan('tiny'));
app.use(session({ secret: process.env.SESSION_SECRET || 'your-random-secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to database Successfully !!!"))
    .catch((err) => {
        console.error("Error connecting to the database:", err);
        process.exit(1);
    });


app.use('/api/v1/users', userRoutes);
app.use('/api/v1/usage', usageDetailsRoutes);
app.use('/api/v1/cummulative', cummulativeRoutes);
app.use('/api/v1/invoice', invoiceRoutes);


app.get('/', (req, res) => {
    res.send("Home Page");
});

app.post('/generate', async(req, res) =>{
    const {userId} = req.body;
    await generateInvoices(userId);
    res.status(200).send("Invoice Generated");
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});
