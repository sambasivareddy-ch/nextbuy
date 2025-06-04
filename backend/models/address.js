import mongoose from "mongoose";

import { numberType, boolType, refType } from "./type.js";

const AddressSchema = mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer"
    },
    total_amount: numberType,
    status: boolType
}, {
    collection: "address",
    timestamps: true
})

const Address = mongoose.model('address', AddressSchema);

export default Address;