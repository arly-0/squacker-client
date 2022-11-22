import {createSlice} from "@reduxjs/toolkit"

const initialState = {sessions: null}

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setSessions(state, action) {
            state.sessions = action.payload
        }
    }
})

export const {setSessions} = sessionSlice.actions
export default sessionSlice.reducer