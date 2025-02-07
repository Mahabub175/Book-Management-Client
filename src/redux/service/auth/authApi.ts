import { baseApi } from "../../api/baseApi";
import { IUser } from "./authSlice";

// Define response types
interface AuthResponse {
  user: IUser;
  token: string;
  success?: boolean;
  data: {
    user: IUser;
    token: string;
  };
}

interface UserListResponse {
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
  results: IUser[];
}

interface SingleUserResponse {
  user: IUser;
}

// Inject endpoints with response types
const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<AuthResponse, Partial<IUser>>({
      query: (userInfo) => ({
        url: "/auth/register/",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["user"],
    }),
    login: build.mutation<AuthResponse, Partial<IUser>>({
      query: (userInfo) => ({
        url: "/auth/login/",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["user"],
    }),
    getUsers: build.query<
      UserListResponse,
      { page?: number; limit?: number; search?: string }
    >({
      query: ({ page = 1, limit = 5, search = "" }) => ({
        url: `/auth/user?page=${page}&limit=${limit}&searchText=${search}`,
        method: "GET",
      }),
      transformResponse: (response: { data: UserListResponse }) => ({
        meta: response?.data?.meta,
        results: response?.data?.results,
      }),
      providesTags: ["user"],
    }),
    getAllUsers: build.query<{ results: IUser[] }, void>({
      query: () => ({
        url: `/auth/user/`,
        method: "GET",
      }),
      transformResponse: (response: { data: { results: IUser[] } }) => ({
        results: response?.data?.results,
      }),
      providesTags: ["user"],
    }),
    getSingleUser: build.query<SingleUserResponse, string>({
      query: (id) => ({
        url: `/auth/user/${id}/`,
        method: "GET",
      }),
      transformResponse: (response: { data: SingleUserResponse }) =>
        response?.data,
      providesTags: ["user"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useGetUsersQuery,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
} = authApi;
