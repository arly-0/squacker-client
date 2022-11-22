import {createSlice} from "@reduxjs/toolkit"

const token = localStorage.getItem('squacker-token')
const initialState = {user: null, isAuth: !!token}
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