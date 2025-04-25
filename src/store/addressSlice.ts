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

            const pkey = newAddress.house_number + newAddress.street + newAddress.city + newAddress.pincode
            if (!state.addresses[pkey]) {
                state.addresses[pkey] = {
                    address: newAddress
                }
                state.count += 1
            }
        }
    }
})

export const { addToAddress } = addressSlice.actions;
export default addressSlice.reducer;