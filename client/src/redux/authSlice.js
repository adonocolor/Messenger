import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: null,
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {}
})

export default authSlice.reducer;
export const {} = authSlice.actions