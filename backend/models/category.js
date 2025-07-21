import mongoose from "mongoose";
import { stringType } from "./type.js";

const CategorySchema = mongoose.Schema({
    name: {
        ...stringType,
        unique: true,
    }
}, {
    collection: "category",
    timestamps: true
})

const Category = mongoose.model('category', CategorySchema);

export default Category;