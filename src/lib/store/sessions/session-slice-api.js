import {api} from "../../api/api"

export const sessionSliceApi = api.injectEndpoints({
    endpoints: builder => ({
        getAllUserSessions: builder.query({
            query: user_id => ({
                url: `/session/${user_id}`,
                method: 'GET'
            })
        })
    })
})

export const {useGetAllUserSessionsQuery} = sessionSliceApi