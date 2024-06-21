import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiRequest from "../../api/request";

const initialState = {
    loading: false,
    data: [],
};

export const login = createAsyncThunk("auth/login", async (data) => {
    const res = await apiRequest({
        url: "auth/login",
        method: "post",
        data: data,
    });

    return res;
});

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,

    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            return {
                ...state,
                loading: true,
            };
        });
        builder.addCase(login.fulfilled, (state, action) => {
            console.log(action.payload);
            return {
                ...state,
                data: action.payload,
                loading: false,
            };
        });
    },
});

export default authSlice.reducer;
