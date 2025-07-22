import { createSlice } from "@reduxjs/toolkit";

import { GadgetProductDetails } from "../types/types";

interface WishlistState {
    products: {
        [productId: string]: {
            product: GadgetProductDetails
        }
    }
    totalProducts: number,
}

const initialState: WishlistState = {
    products: {},
    totalProducts: 0,
};

const wishlistSlice = createSlice({
    name: "Wish List",
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            const product: GadgetProductDetails = action.payload.product;
            const existingProduct = state.products[product._id]

            if (!existingProduct) {
                state.products[product._id] = {
                    product,
                }
                state.totalProducts += 1;
            }
        },
        removeFromWishlist: (state, action) => {
            const productId: string = action.payload.productId;
            const existingProduct = state.products[productId]

            if (existingProduct) {
                delete state.products[productId]
                state.totalProducts -= 1
            }
        },
    }
})

export const {addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;