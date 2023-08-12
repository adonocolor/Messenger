import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        accessToken : null
    },
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload
            state.accessToken = accessToken;
        },
        logOut: (state, action) => {
            state.accessToken = null;
        }
    }
})

export const {setCredentials, logOut} = authSlice.actions
export default authSlice.reducer;
export const selectCurrentToken = (state) => state.auth.accessToken;
