import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {setCredentials, logOut} from '../store/auth/auth-slice'

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/`,
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
        const token = localStorage.getItem('squacker-token')
        if(token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let response = await baseQuery(args, api, extraOptions)
    if(response?.error?.originalStatus === 401) {
        const refreshResponse = await baseQuery('/refresh', api, extraOptions)
        if(refreshResponse?.data) {
            api.dispatch(setCredentials({...refreshResponse.data}))
            response = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }
    return response
}

export const api = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})