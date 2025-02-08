import { baseApi } from "@/redux/api/baseApi";

export interface IBook {
  _id: string;
  name: string;
  user: { _id: string };
  author: string;
  description: string;
  price: number;
  genre: string;
  language: string;
  publishedAt: string;
  coverImage: any;
  success?: boolean;
  message?: string;
}

interface Meta {
  total: number;
  page: number;
  limit: number;
}

interface BookListResponse {
  success?: boolean;
  meta?: Meta;
  results: IBook[];
}

interface AddBookResponse {
  book: IBook;
  success?: boolean;
  message: string;
}

interface UpdateBookPayload {
  id: string;
  data: Partial<IBook> | FormData;
}

interface DeleteBulkPayload {
  ids: string[];
}

// Inject endpoints with response types
const bookApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addBook: build.mutation<AddBookResponse, FormData>({
      query: (data) => ({
        url: "/book/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["book"],
    }),
    getBooks: build.query<
      BookListResponse,
      { page?: number; limit?: number; search?: string }
    >({
      query: ({ page = 1, limit = 5, search = "" }) => ({
        url: `/book?page=${page}&limit=${limit}&searchText=${search}`,
        method: "GET",
      }),
      transformResponse: (response: { data: BookListResponse }) => ({
        meta: response?.data?.meta,
        results: response?.data?.results,
      }),
      providesTags: ["book"],
    }),
    getAllBooks: build.query<{ results: IBook[] }, void>({
      query: () => ({
        url: `/book/`,
        method: "GET",
      }),
      transformResponse: (response: { data: { results: IBook[] } }) => ({
        results: response?.data?.results,
      }),
      providesTags: ["book"],
    }),
    getSingleBook: build.query<IBook, string>({
      query: (id) => ({
        url: `/book/${id}/`,
        method: "GET",
      }),
      transformResponse: (response: { data: IBook }) => response?.data,
      providesTags: ["book"],
    }),
    updateBook: build.mutation<IBook, UpdateBookPayload>({
      query: ({ id, data }) => ({
        url: `/book/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["book"],
    }),
    deleteBook: build.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/book/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["book"],
    }),
    deleteBulkBook: build.mutation<
      { success: boolean; message: string },
      DeleteBulkPayload
    >({
      query: (payload) => ({
        url: `/book/bulk-delete/`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["book"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddBookMutation,
  useGetBooksQuery,
  useGetAllBooksQuery,
  useGetSingleBookQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useDeleteBulkBookMutation,
} = bookApi;
