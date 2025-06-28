import express from 'express';
import bcrypt from 'bcrypt';
import Customer from '../../../models/customer.js';

const router = express.Router();

router.put('/reset-password', async (req, res) => {
    const user = req.body;

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(user?.password, 10)
    } catch(err) {
        console.log(err)
    }

    user.password = hashedPassword;

    try {
        const updatedUser = await Customer.findOneAndUpdate(
            { _id: user.id },
            user
        )

        res.status(201).json({
            success: true,
            message: "Updated Password Successfully",
        })
    } catch(err) {
        res.status(500).json({
            success: false,
            message: "Updating Password Failed",
        })
    }
})  

export default router;