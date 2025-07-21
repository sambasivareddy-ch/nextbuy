import { Router } from "express";

import Category from "../../models/category.js";
import Product from "../../models/product.js";

const router = Router({ mergeParams: true })

router.get('/', async (req, res) => {
    const { categoryName } = req.params;

    try {
        const category = await Category.findOne({ name: categoryName })
        if (!category) {
            res.status(400).json({
                success: false,
                message: "Unable to fetch the category: " + categoryName
            })
            return;
        }

        const products = await Product.find({ category: category._id }).populate("category")

        res.status(200).json({
            products, 
            success: true
        })
    } catch (err) {
        res.status(500).json({
            message: "Unable to fetch the products under category: " + categoryName
        })
    }
})

export default router;