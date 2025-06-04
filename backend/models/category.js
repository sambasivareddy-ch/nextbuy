import mongoose from "mongoose";
import { stringType } from "./type.js";

const CategorySchema = mongoose.Schema({
    name: stringType,
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
    }
}, {
    collection: "category",
    timestamps: true
})

const Category = mongoose.model('category', CategorySchema);

export default Category;