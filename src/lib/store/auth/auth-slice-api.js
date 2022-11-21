import { authAPI } from "../../api/auth"

export const authAPISlice = authAPI.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/login',
                method: 'POST',
                body: {...credentials}
            })
        }),
    })
})

export const {useLoginMutation} = authAPISlice