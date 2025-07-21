import mongoose from "mongoose";

import { stringType } from "./type.js";

const AdminSchema = mongoose.Schema({
    email: {
        ...stringType,
        unique: true,
    },
    password: stringType,
}, {
    collection: "admin",
    timestamps: true
})

const Admin = mongoose.model('admin', AdminSchema);

export default Admin;