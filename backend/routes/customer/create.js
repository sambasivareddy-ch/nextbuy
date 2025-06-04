import express from 'express';
import bcrypt from 'bcrypt';
import Customer from '../../models/customer.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const newUser = req.body;

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(newUser?.password, 10)
    } catch(err) {
        console.log(err)
    }

    newUser.password = hashedPassword;

    Customer.create(newUser)
        .then(() => {
            res.status(201).json({
                success: true,
                message: "user created successfully"
            })
        }).catch((err) => {
            res.status(500).json({
                success: false,
                error: err.message,
            })
        })
})  

export default router;