import express from 'express';
import Product from '../../models/product.js';
import Category from '../../models/category.js';

const router = express.Router();

router.route('/add-product')
    .get((req, res) => {
        const admin = req.session.admin;

        if (!admin) {
            res.redirect('/');
        }

        res.render('add-product', { admin })
    })
    .post(async (req, res) => {
        const { product, brand, category, price, stock, image, description } = req.body;

        const admin = req.session.admin;

        if (!admin) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        try {
            // Step 1: Find or create category
            let foundCategory = await Category.findOne({ name: category });
            if (!foundCategory) {
                foundCategory = await Category.create({ name: category });
            }

            // Step 2: Create product with reference to category
            await Product.create({
                name: product, 
                brand,
                description,
                price,
                image,
                stock,
                category: foundCategory._id,
                admin: admin.id
            });

            res.redirect('/admin/add-product');
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: "Unable to add the product or category",
            });
        }
    })

export default router;