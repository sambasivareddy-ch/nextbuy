import express from 'express';
import bcrypt from 'bcrypt';

import Admin from '../../models/admin.js'

const router = express.Router();

router.route('/')
    .get((req, res) => {
        res.render('login-form')
    })
    .post(async (req, res) => {
        const { email, password } = req.body;

        try {
            const admin = await Admin.findOne({ email });

            const matched = await bcrypt.compare(password, admin.password);

            if (matched) {
                res.redirect('/admin/add-product')
            } else {
                res.status(401).json({
                    success: false,
                    message: "login failed"
                })
            }
        } catch (err) {
            res.json({
                success: false,
                err,
            })
        }
    })

export default router;