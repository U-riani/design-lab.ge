import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const designersApiSlice = createApi({
  reducerPath: "designersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://design-union-backend.vercel.app/api/",
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Designer"],
  endpoints: (builder) => ({
    getAllDesigners: builder.query({
      query: () => "designers",
      providesTags: ["Designer"],
    }),
    getSingleDesigner: builder.query({
      query: (id) => `designers/${id}`,
      providesTags: (result, error, id) => [{ type: "Designer", id }],
    }),
    createDesigner: builder.mutation({
      query: (formData) => ({
        url: "designers",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Designer"],
    }),
    deleteDesigner: builder.mutation({
      query: (id) => ({
        url: `designers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Designer", id }],
    }),
    updateDesigner: builder.mutation({
      query: ({ id, text, name, facebook, instagram, activeStatus, behance, images }) => {
        const formData = new FormData();
        formData.append("name[ge]", name.ge);
        formData.append("name[en]", name.en);
        formData.append("text[ge]", text.ge);
        formData.append("text[en]", text.en);
        formData.append("facebook", facebook);
        formData.append("activeStatus", activeStatus)
        formData.append("instagram", instagram);
        formData.append("behance", behance);
        if (images) formData.append("images", images[0]);
        if (images) formData.append("images", images[1]);
        return {
          url: `designers/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Designer", id }],
    }),
  }),
});

export const {
  useGetAllDesignersQuery,
  useGetSingleDesignerQuery,
  useCreateDesignerMutation,
  useDeleteDesignerMutation,
  useUpdateDesignerMutation,
} = designersApiSlice;
