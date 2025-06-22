import mongoose from "mongoose";

import { numberType, boolType, refType, stringType } from "./type.js";

const AddressSchema = mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer"
    },
    name: stringType,
    houseNumber: numberType,
    street: stringType,
    city: stringType,
    state: stringType,
    country: stringType,
    pincode: numberType,
    phone: stringType,
}, {
    collection: "address",
    timestamps: true
})

const Address = mongoose.model('address', AddressSchema);

export default Address;