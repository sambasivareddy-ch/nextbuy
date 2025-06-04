import mongoose from "mongoose"

export const stringType = {
    type: String,
    required: true,
}

export const boolType = {
    type: Boolean,
    required: true,
}

export const numberType = {
    type: Number,
    required: true,
}

export const refType = {
    type: mongoose.Schema.Types.ObjectId,
    ref: "",
    setRef: function(refName) {
        this.ref = refName
        return this
    }
}