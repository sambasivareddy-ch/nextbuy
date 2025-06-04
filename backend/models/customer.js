import mongoose from "mongoose";

import { stringType } from "./type.js";

const CustomerSchema = mongoose.Schema({
    name: stringType,
    email: {
        ...stringType,
        unique: true,
    },
    password: stringType,
    phone: stringType
}, {
    collection: "customer",
    timestamps: true
})

const Customer = mongoose.model('customer', CustomerSchema);

export default Customer;