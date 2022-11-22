import {configureStore} from "@reduxjs/toolkit";
import { api } from "../api/api";
import authReducer from "./auth/auth-slice";
import sessionReducer from "./sessions/session-slice"

export default configureStore({
    reducer: {
       [api.reducerPath]: api.reducer,
       auth: authReducer,
       session:  sessionReducer

    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(api.middleware),
        devTools: true
})