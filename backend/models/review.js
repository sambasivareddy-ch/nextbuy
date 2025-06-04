import mongoose from "mongoose";
import { numberType, stringType } from "./type.js";

const ReviewSchema = mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer"
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    },
    rating: numberType,
    commnet: stringType,
}, {
    collection: "review",
    timestamps: true
})

const Review = mongoose.model('review', ReviewSchema)

export default Review;