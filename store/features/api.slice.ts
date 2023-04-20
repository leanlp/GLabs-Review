import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "config";
import { TGetEnterRaffleResponse, TRaffle } from "types/index";
import { setNFTs } from "./nfts.slice";
import {
  setEnteredRaffles,
  setRaffles,
  setSelectedRaffle,
} from "./raffles.slice";
import { setUser } from "./user.slice";
import { TUser } from "types";
import {
  setAdvancedAnalytics,
  setBasicAnalytics,
  setCreatorRaffles,
  setParticipants,
} from "./creator.slice";
import { TBasicAnalytics } from "../../types/index";

interface IGetRaffleByIdParams {
  raffleId: string;
  populate?: boolean;
}

interface IGetUserByAddressParams {
  primaryWallet: string;
}

interface ICreateUserParams {
  primaryWallet: string;
}

interface IEnterRaffleParams {
  raffleId: string;
  primaryWallet: string;
}

interface IUpdateUserParams {
  primaryWallet: string;
  mintWallet: string;
  twitter?: string;
  discord?: string;
}

interface ISetUserWalletParams {
  primaryWallet: string;
  mintWallet: string[];
  preferredMintWallet: string;
}

interface IUpdateUserWalletParams {
  primaryWallet: string;
  mintWallets: string[];
  preferredMintWallet: string;
}

interface IPickWinnersParams {
  raffleId: string;
}

interface IPickWinnersResponse {
  winners: string[];
  status: string;
  code: number | null;
  message: string | null;
}

interface IPickWinnersResponseError {
  status: "error";
  code: number;
  message: string;
}

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  tagTypes: ["Raffle", "User"],
  endpoints: (builder) => ({
    /**
     * Query to get user by address and set user in store
     * @param primaryWallet
     * @returns {TUser}
     */
    getUser: builder.query<TUser, IGetUserByAddressParams>({
      query: ({ primaryWallet }) => ({
        ...config.API.ENDPOINTS.GET_USER,
        params: { primaryWallet: primaryWallet.toLowerCase() },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const result = await queryFulfilled;
        const { data } = result;
        if (data) {
          dispatch(setUser(data));
          dispatch(setNFTs(data.nfts));
        }
      },
      providesTags: ["User"],
    }),
    /**
     * Mutation to create user and set user in store
     * @param primaryWallet
     * @returns {TUser}
     */
    createUser: builder.mutation<TUser, ICreateUserParams>({
      query: ({ primaryWallet }) => ({
        ...config.API.ENDPOINTS.CREATE_USER,
        body: {
          primaryWallet: primaryWallet.toLowerCase(),
        },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const result = await queryFulfilled;
        const { data } = result;
        if (data) {
          dispatch(setUser(data));
          dispatch(setNFTs(data.nfts));
        }
      },
      invalidatesTags: ["User"],
    }),
    /**
     * Mutation to update user and set user in store
     * @param body {TUser} - user object
     * @returns {TUser}
     * TODO: update user in store
     * TODO: update nfts in store
     */
    updateUser: builder.mutation<TUser, IUpdateUserParams>({
      query: (params) => ({
        ...config.API.ENDPOINTS.UPDATE_USER,
        body: {
          ...params,
          primaryWallet: params.primaryWallet.toLowerCase(),
        },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const result = await queryFulfilled;
        const { data } = result;
        if (data) {
          dispatch(setUser(data));
        }
      },
      invalidatesTags: ["User"],
    }),
    /**
     * Mutation to set user wallet and set user in store
     * @deprecated
     */
    setUserWallet: builder.mutation<TUser, ISetUserWalletParams>({
      query: (params) => ({
        ...config.API.ENDPOINTS.SET_USER_WALLETS,
        body: {
          ...params,
          primaryWallet: params.primaryWallet.toLowerCase(),
        },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const result = await queryFulfilled;
        const { data } = result;
        if (data) {
          console.log(data);
        }
      },
      invalidatesTags: ["User"],
    }),
    /**
     * Mutation to update user wallets and set result in store
     */
    updateUserWallets: builder.mutation<TUser, IUpdateUserWalletParams>({
      query: (params) => ({
        ...config.API.ENDPOINTS.UPDATE_USER_WALLETS,
        body: {
          primaryWallet: params.primaryWallet.toLowerCase(),
          mintWallets: params.mintWallets.map((wallet) => wallet.toLowerCase()),
          preferredMintWallet: params.preferredMintWallet.toLowerCase(),
        },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const result = await queryFulfilled;
        const { data } = result;
        if (data) {
          console.log(data);
        }
      },
      invalidatesTags: ["User"],
    }),

    /**
     * TODO: what is this for?
     */
    getUserRaffles: builder.mutation<TRaffle[], string>({
      query: (primaryWallet) => ({
        ...config.API.ENDPOINTS.GET_USER_RAFFLES,
        params: { primaryWallet: primaryWallet.toLowerCase() },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const result = await queryFulfilled;
        const { data } = result;
        if (data) {
          dispatch(setEnteredRaffles(data));
        }
      },
    }),
    /**
     * Mutation to create raffle and set raffle in store
     * @param body {TRaffle} - raffle object
     */
    createRaffle: builder.mutation({
      query: (body) => ({
        ...config.API.ENDPOINTS.CREATE_RAFFLE,
        body,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const result = await queryFulfilled;
        const { data } = result;
        if (data) {
          console.log(data);
        }
      },
      invalidatesTags: ["Raffle"],
    }),
    /**
     * Query to get All raffles and set raffles in store
     * @returns {TRaffle[]}
     */
    getAllRaffles: builder.query<TRaffle[], void>({
      query: () => ({
        ...config.API.ENDPOINTS.GET_ALL_RAFFLES,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const result = await queryFulfilled;
        const { data } = result;
        if (data) {
          dispatch(setRaffles(data));
          const participants: TUser[] = data.reduce(
            (acc: TUser[], raffle: TRaffle) => {
              return [...acc, ...raffle.participants];
            },
            []
          );
          dispatch(setParticipants(participants));
        }
      },
      providesTags: ["Raffle"],
    }),
    /**
     * Query to get active raffles and set raffles in store
     * @param populate {boolean} - populate raffles with nfts
     * @param userType {TUserType} - user type
     * @returns {TRaffle[]}
     */
    getActiveRaffles: builder.query<
      TRaffle[],
      {
        populate?: boolean;
      }
    >({
      query: () => ({
        ...config.API.ENDPOINTS.GET_ACTIVE_RAFFLES,
      }),
      onQueryStarted: async (params, { dispatch, queryFulfilled }) => {
        const result = await queryFulfilled;
        const { data } = result;
        if (data) {
          dispatch(setRaffles(data));
        }
      },
      providesTags: ["Raffle"],
    }),
    /**
     * Query to get raffle by id and set raffle in store
     * @param raffleId {string} - raffle id
     * @param populate {boolean} - populate raffle with nfts
     * @returns {TRaffle}
     * TODO: update raffle in store
     */
    getRaffleById: builder.query<TRaffle, IGetRaffleByIdParams>({
      query: ({ raffleId, populate = false }) => ({
        ...config.API.ENDPOINTS.GET_RAFFLE_BY_ID,
        params: { raffleId, populate },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const result = await queryFulfilled;
        const { data } = result;
        if (data) {
          dispatch(setSelectedRaffle(data));
        }
      },
    }),
    /**
     * Mutation to enter raffle
     * @param raffleId {string} - raffle id
     * @param primaryWallet {string} - user address
     * @returns {TGetEnterRaffleResponse}
     */
    enterRaffle: builder.mutation<TGetEnterRaffleResponse, IEnterRaffleParams>({
      query: ({ raffleId, primaryWallet }) => ({
        ...config.API.ENDPOINTS.ENTER_RAFFLE,
        params: { raffleId, primaryWallet: primaryWallet.toLowerCase() },
      }),

      invalidatesTags: ["User"],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const result = await queryFulfilled;
        const { data } = result;
        if (data) {
          console.log(data);
        }
      },
    }),
    pickWinners: builder.mutation<
      IPickWinnersResponse | IPickWinnersResponseError,
      IPickWinnersParams
    >({
      query: ({ raffleId }) => ({
        ...config.API.ENDPOINTS.PICK_WINNERS,
        params: { raffleId },
      }),
      invalidatesTags: ["User"],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const result = await queryFulfilled;
        const { data } = result;
        if (data) {
          console.log(data);
        }
      },
    }),

    getBasicAnalytics: builder.query<TBasicAnalytics, void>({
      query: () => ({
        ...config.API.ENDPOINTS.GET_BASIC_ANALYTICS,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const result = await queryFulfilled;
          const { data } = result;
          if (data) {
            dispatch(setBasicAnalytics(data));
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
    getAdvancedAnalytics: builder.query<any, void>({
      query: () => ({
        ...config.API.ENDPOINTS.GET_ADVANCED_ANALYTICS,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const result = await queryFulfilled;
          const { data } = result;
          if (data) {
            dispatch(setAdvancedAnalytics(data));
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const {
  useCreateRaffleMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useGetUserRafflesMutation,
  useGetAllRafflesQuery,
  useGetActiveRafflesQuery,
  useGetRaffleByIdQuery,
  useGetUserQuery,
  useEnterRaffleMutation,
  useGetBasicAnalyticsQuery,
  useGetAdvancedAnalyticsQuery,
  usePickWinnersMutation,
  useUpdateUserWalletsMutation,
} = apiSlice;

export default apiSlice;
