import {api} from "../../api/api"

export const sessionSliceApi = api.injectEndpoints({
    endpoints: builder => ({
        getAllUserSessions: builder.query({
            query: user_id => ({
                url: `/session/${user_id}`,
                method: 'GET',
            }),
            providesTags: ['Session']
        }),
        updateSession: builder.mutation({
            query: (id, session) => ({
                url: `/session/${id}`,
                method: 'PATCH',
                body: session
            }),
            providesTags: ['Session']
        })
    })
})

export const {useGetAllUserSessionsQuery, useUpdateSessionMutation} = sessionSliceApi