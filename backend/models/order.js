import mongoose from "mongoose";
import { numberType, boolType } from "./type.js";

const OrderSchema = mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer",
    },
    total_amount: numberType,
    status: boolType,
},{
    collection: "order",
    timestamps: true
})

const Order = mongoose.model('order', OrderSchema);

export default Order;