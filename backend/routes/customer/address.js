import express from 'express';

import Address from '../../models/address';

const router = express.Router();

router.route('/address')
    .get(async (req, res) => {
        const { customer_id } = req.body;
        
        try {
            const address = await Address.find({ customer_id });

            res.status(200).json(address);
        } catch(err) {
            res.status(500).json({
                error: "Failed to fetch the address"
            })
        }
    })
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