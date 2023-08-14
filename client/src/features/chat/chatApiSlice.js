import {apiSlice} from "../../app/api/apiSlice";

export const chatApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getChats: builder.query({
            query: () => '/chat',
            keepUnusedDataFor: 5,
        })
    })
})

export const {
    useGetChatsQuery,
} = chatApiSlice