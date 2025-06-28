import express from 'express';

import Address from '../../models/address.js';

const router = express.Router();

router.get('/address/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const address = await Address.find({ customer_id: id });

        res.status(200).json(address);
    } catch(err) {
        res.status(500).json({
            error: "Failed to fetch the address"
        })
    }
})

export default router;