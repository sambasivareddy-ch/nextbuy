import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import cors from 'cors';

import ConnectToDB from "./utils/connect.js";
import createCustomerRoute from "./routes/customer/create.js";
import loginCustomerRoute from "./routes/customer/login.js";
import addProductRoute from "./routes/admin/add-product.js";
import addressRoute from "./routes/customer/address.js";

// Express Application
const app = express()

// Configure tha application with required packages
config();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'pug');

// Base route
app.get('/hello', (req, res) => {
    res.send('Hello World!!')
})

app.use("/create", createCustomerRoute);
app.use("/login", loginCustomerRoute);
app.use(addProductRoute);
app.use(addressRoute);

// Listening at configured port
const APP_PORT = process.env.PORT || 5001;
ConnectToDB(() => {
    app.listen(APP_PORT, () => {
        console.log(`Listening at Port: ${APP_PORT}`)
    })
})