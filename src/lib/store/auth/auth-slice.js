import {createSlice} from "@reduxjs/toolkit"

const initialState = {user: null, token: null, isAuth: false}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredendials(state, action) {
            const {user, accessToken} = action.payload
            state.user = user
            state.token = accessToken
            state.isAuth = true
        },
        logOut(state, action) {
            state.user = null
            state.token = null
            state.isAuth = false
        }
    },
})

export const {setCredendials, logOut} = authSlice.actions
export default authSlice.reducer

export const selectCurrentUser = state => state.auth.user
export const selectCurrentToken = state => state.auth.token
export const selectCurrentAuthState = state => state.auth.isAuth