import { Router } from "express";

import Product from "../../models/product.js";

const router = Router({ mergeParams: true })

router.get('/', async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id).populate("category")

        res.status(200).json({
            product, 
            success: true
        })
    } catch (err) {
        res.status(500).json({
            message: "Unable to fetch the product with given Id: " 
        })
    }
})

export default router;