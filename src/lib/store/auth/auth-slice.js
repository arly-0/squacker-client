import {createSlice} from "@reduxjs/toolkit"
import jwtDecode from "jwt-decode"

const token = localStorage.getItem('squacker-token')
const decodedToken = token ? jwtDecode(token) : null
const user = decodedToken ? {email: decodedToken.email, id: decodedToken.id, isActivated: decodedToken.isActivated} : null

const initialState = {user, isAuth: !!token}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials(state, action) {
            const {user, accessToken} = action.payload
            state.user = user
            state.isAuth = true
            localStorage.setItem('squacker-token', accessToken)
        },
        logOut(state, action) {
            state.user = null
            state.isAuth = false
            localStorage.removeItem('squacker-token')
        }
    },
})

export const {setCredentials, logOut} = authSlice.actions
export default authSlice.reducer

export const selectCurrentUser = state => state.auth.user
export const selectCurrentAuthState = state => state.auth.isAuth