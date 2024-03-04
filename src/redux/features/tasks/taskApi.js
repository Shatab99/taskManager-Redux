import  baseApi  from "../api/baseApi";

const taskApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => '/tasks',
            providesTags: ['tasks']
        }),
        updateTask: builder.mutation({
            query: ({ id, status }) => ({
                url: `/tasks/${id}`,
                method: 'PATCH',
                body: { status }
            }),
            invalidatesTags: ['tasks']
        }),
        addTask: builder.mutation({
            query: (data) => ({
                url: '/tasks',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['tasks']
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['tasks']
        })
    })
})

export const { useGetTasksQuery, useUpdateTaskMutation, useAddTaskMutation , useDeleteTaskMutation}=taskApi