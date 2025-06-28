import express from 'express';

import Address from '../../models/address.js';

const router = express.Router();

router.post('/address', async (req, res) => {
    const addressData = req.body;

    try {
        const newAddress = new Address(addressData);
        await newAddress.save();

        res.status(201).json(newAddress);
    } catch(err) {
        res.status(500).json({
            error: "Failed to add the address"
        })
    }
})

export default router;