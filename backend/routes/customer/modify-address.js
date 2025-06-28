import express from 'express';

import Address from '../../models/address.js';

const router = express.Router();

router.route('/address')
    .post(async (req, res) => {
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
    .put(async (req, res) => {
        const addressData = req.body;

        try {
            const updatedAddress = await Address.findOneAndReplace(
                { customer_id: addressData.customer_id},
                addressData
            )

            res.status(201).json(updatedAddress);
        } catch(err) {
            res.status(500).json({
                error: "Failed to update the address",
            })
        }
    })


export default router;