import {configureStore} from "@reduxjs/toolkit";
import { authAPI } from "../api/auth";
import authReducer from "./auth/auth-slice";

export default configureStore({
    reducer: {
       [authAPI.reducerPath]: authAPI.reducer,
       auth: authReducer
    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(authAPI.middleware),
        devTools: true
})