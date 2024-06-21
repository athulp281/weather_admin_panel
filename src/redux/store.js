import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/authSlice";

export default configureStore({
    reducer: {
        login: loginReducer,
    },
});
