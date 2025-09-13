import { createSlice } from "@reduxjs/toolkit"; 
import { AddressInfo } from "../types/types";

export interface addressState {
    addresses: {
        [pkey: string]: {
            address: AddressInfo,
        }
    }
    count: number,
}

const initialState:addressState = {
    addresses: {},
    count: 0
}

const addressSlice = createSlice({
    name: "User Addresses",
    initialState,
    reducers: {
        addToAddress(state, action) {
            const newAddress: AddressInfo = action.payload.address;

            const pkey = newAddress.pincode
            state.addresses[pkey] = {
                address: newAddress
            }
            state.count += 1
        },
        clearAddress(state) {
            state.addresses = {},
            state.count = 0
        }
    }
})

export const { addToAddress, clearAddress } = addressSlice.actions;
export default addressSlice.reducer;