import { base_url } from "@/utils/configs/base_api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// main api for the website
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${base_url}`,
    credentials: "include",
  }),
  tagTypes: ["book", "user"],
  endpoints: () => ({}),
});
