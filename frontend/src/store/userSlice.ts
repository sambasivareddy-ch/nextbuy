import { createSlice } from '@reduxjs/toolkit';

import { UserInfo } from '../types/types';

interface UserState {
    user: UserInfo | null;
    isAuthenticated: boolean;
    token: string | null;
}

const initialState: UserState = {
    user: null,
    isAuthenticated: false,
    token: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.token = action.payload.token;
        },
        clearUser(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.token = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;