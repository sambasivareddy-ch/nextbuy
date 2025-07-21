import mongoose from "mongoose";

import { stringType, numberType, boolType } from "./type.js";

const ProductSchema = mongoose.Schema({
    name: stringType,
    brand: stringType,
    description: stringType,
    price: numberType,
    image: stringType,
    stock: numberType,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin",
        required: true
    }
}, {
    collection: "product",
    timestamps: true
})

const Product = mongoose.model('product', ProductSchema);

export default Product;