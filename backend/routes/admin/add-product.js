import express from 'express';

const router = express.Router();

router.route('/add-product')
    .get((req, res) => {
        res.render('add-product')
    })
    .post((req, res) => {
        res.json({
            success: true,
        })
    })

export default router;