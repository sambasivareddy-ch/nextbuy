import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import cors from 'cors';
import session from 'express-session';

import ConnectToDB from "./utils/connect.js";
import createCustomerRoute from "./routes/customer/auth/create.js";
import loginCustomerRoute from "./routes/customer/auth/login.js";
import addProductRoute from "./routes/admin/add-product.js";
import addressRoute from "./routes/customer/address.js";
import modifyAddressRoute from "./routes/customer/modify-address.js";
import resetPasswordRoute from "./routes/customer/auth/reset-password.js";
import adminLoginFormRoute from "./routes/admin/admin-login.js";
import verifyToken from "./middleware/verifyUser.js";

import getProductsBasedOnCategory from "./routes/customer/get-products-on-category.js";
import getProductWithId from './routes/customer/get-product.js';

// Express Application
const app = express()

// Configure tha application with required packages
config();
app.use(express.json());
// app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'pug');

app.use(session({
    secret: process.env.JWT_SECRET, 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || process.env.ALLOWEDORIGIN.includes(origin)) {
                // Allow the request from allowed origins or if no origin is provided (e.g., mobile apps)
                callback(null, true);
            } else {
                // Reject requests from other origins
                callback(new Error("Not allowed by CORS"), false);
            }
        },
        methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
        credentials: true,
    })
);

// Base route
app.get('/hello', (req, res) => {
    res.send('Hello World!!')
})

app.use("/auth", createCustomerRoute);
app.use("/auth", loginCustomerRoute);
app.use("/auth", resetPasswordRoute);
app.use("/admin", addProductRoute);
app.use(adminLoginFormRoute);
app.use('/user', verifyToken, addressRoute);
app.use('/user', verifyToken, modifyAddressRoute);
app.use('/category/:categoryName', getProductsBasedOnCategory);
app.use('/product/:id', getProductWithId);

// Listening at configured port
const APP_PORT = process.env.PORT || 5001;
ConnectToDB(() => {
    app.listen(APP_PORT, () => {
        console.log(`Listening at Port: ${APP_PORT}`)
    })
})