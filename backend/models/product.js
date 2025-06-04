import mongoose from "mongoose";

import { stringType, numberType, boolType } from "./type";

const ProductSchema = mongoose.Schema({
    name: stringType,
    description: stringType,
    price: numberType,
    stock: boolType,
}, {
    collection: "product",
    timestamps: true
})

const Product = mongoose.model('product', ProductSchema);

export default Product;