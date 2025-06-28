import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import Customer from '../../../models/customer.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const customer = await Customer.findOne({ email })

        if (customer) {
            const matched = await bcrypt.compare(password, customer.password);

            if (matched) {
                const token = jwt.sign({ userId: customer._id }, process.env.JWT_SECRET, { expiresIn: '6h' });

                res.status(200).json({
                    success: true,
                    message: "login successful",
                    token,
                    customer: {
                        id: customer._id,
                        name: customer.name,
                        email: customer.email,
                        phone: customer.phone,
                    }
                })
            } else {
                res.status(401).json({
                    success: false,
                    message: "login failed"
                })
            }
        } else {
            res.status(404).json({
                success: false,
                error: "user not found",
            })
        }
    } catch(err) {
        res.status(500).json({
            success: false,
            error: err.message,
        })
    }
})

export default router;