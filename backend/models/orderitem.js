import mongoose from "mongoose";
import { numberType } from "./type.js";

const OrderItemSchema = mongoose.Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
    },
    quantity: numberType,
    price: numberType,
}, {
    collection: "order-item",
    timestamps: true
})

const OrderItem = mongoose.model('order-item', OrderItemSchema);

export default OrderItem;