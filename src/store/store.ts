import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';

import cartReducer from "./cartSlice";
import favoriteReducer from "./wishlistSlice"
import addressReducer from "./addressSlice"

const cartPersistConfig = {
    key: 'root_cart',
    storage
}

const wishlistPersistConfig = {
    key: 'root_wishlist',
    storage
}

const addressPersistConfig = {
    key: 'root_address',
    storage
}

const cartPersistedReducer = persistReducer(cartPersistConfig, cartReducer);
const wishlistPersistedReducer = persistReducer(wishlistPersistConfig, favoriteReducer);
const addressPersistedReducer = persistReducer(addressPersistConfig, addressReducer);

const store = configureStore({
    reducer: {
        cart: cartPersistedReducer,
        favorite: wishlistPersistedReducer,
        address: addressPersistedReducer,
    }
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;
export default store;
