import { baseApi } from "@/redux/api/baseApi";

export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publishedAt: number;
  coverImage: string;
}

interface Meta {
  total: number;
  page: number;
  limit: number;
}

interface BookListResponse {
  meta?: Meta;
  results: Book[];
}

interface SingleBookResponse {
  book: Book;
}

interface AddBookResponse {
  book: Book;
}

interface UpdateBookPayload {
  id: string;
  data: Partial<Book>;
}

interface DeleteBulkPayload {
  ids: string[];
}

// Inject endpoints with response types
const bookApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addBook: build.mutation<AddBookResponse, Partial<Book>>({
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
    getAllBooks: build.query<{ results: Book[] }, void>({
      query: () => ({
        url: `/book/`,
        method: "GET",
      }),
      transformResponse: (response: { data: { results: Book[] } }) => ({
        results: response?.data?.results,
      }),
      providesTags: ["book"],
    }),
    getSingleBook: build.query<SingleBookResponse, string>({
      query: (id) => ({
        url: `/book/${id}/`,
        method: "GET",
      }),
      transformResponse: (response: { data: SingleBookResponse }) =>
        response?.data,
      providesTags: ["book"],
    }),
    updateBook: build.mutation<Book, UpdateBookPayload>({
      query: ({ id, data }) => ({
        url: `/book/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["book"],
    }),
    deleteBook: build.mutation<void, string>({
      query: (id) => ({
        url: `/book/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["book"],
    }),
    deleteBulkBook: build.mutation<void, DeleteBulkPayload>({
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
