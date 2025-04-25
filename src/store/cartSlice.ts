import { createSlice } from "@reduxjs/toolkit";

import { GadgetProductDetails } from "../types/types";

interface CartState {
    products: {
        [productId: string]: {
            product: GadgetProductDetails,
            count: number,
        }
    }
    totalPrice: number,
    totalProducts: number,
}

const initialState: CartState = {
    products: {},
    totalPrice: 0,
    totalProducts: 0,
};

const cartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product: GadgetProductDetails = action.payload.product;
            const existingProduct = state.products[product.productId]

            if (existingProduct) {
                existingProduct.count += 1;
                state.totalPrice += existingProduct.product.price;
            } else {
                state.products[product.productId] = {
                    product,
                    count: 1,
                }
                state.totalPrice += state.products[product.productId].product.price
            }
            state.totalProducts += 1;
        },
        removeFromCart: (state, action) => {
            const productId: string = action.payload.productId;
            const existingProduct = state.products[productId];

            if (existingProduct) {
                state.totalProducts -= existingProduct.count;
                state.totalPrice -= existingProduct.count * existingProduct.product.price;
                existingProduct.count = 0;
                delete state.products[productId]
            }
        },
        increaseTheSelectedProductToGivenCount: (state, action) => {
            const productId = action.payload.productId;
            const newCount = action.payload.count;
            const existingProduct = state.products[productId]

            if (existingProduct) {
                state.totalProducts -= existingProduct.count
                state.totalPrice -= existingProduct.count * existingProduct.product.price
                existingProduct.count = newCount
                state.totalProducts += newCount;
                state.totalPrice += existingProduct.product.price * newCount
            }
        },
    }
})

export const {addToCart, removeFromCart, increaseTheSelectedProductToGivenCount } = cartSlice.actions;
export default cartSlice.reducer;