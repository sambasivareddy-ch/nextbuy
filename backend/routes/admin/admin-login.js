import express from 'express';

const router = express.Router();

router.route('/')
    .get((req, res) => {
        res.render('login-form')
    })
    .post((req, res) => {
        res.json({
            success: true,
        })
    })

export default router;