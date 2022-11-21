import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {setCredendials, logOut} from '../store/auth/auth-slice'

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/auth`,
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.token
        if(token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let response = await baseQuery(args, api, extraOptions)
    if(response?.error?.originalStatus === 401) {
        console.log('sending refresh token');
        const refreshResponse = await baseQuery('/refresh', api, extraOptions)
        console.log(refreshResponse);
        if(refreshResponse?.data) {
            api.dispatch(setCredendials({...refreshResponse.data}))
            response = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }
    return response
}

export const authAPI = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})