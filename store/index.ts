import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import userReducer from "./features/user.slice";
import creatorSlice from "./features/creator.slice";
import apiSlice from "./features/api.slice";
import walletConnectionSlice from "./features/walletconnection.slice";
import rafflesSlice from "./features/raffles.slice";
import nftsSlice from "./features/nfts.slice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
    raffles: rafflesSlice,
    nfts: nftsSlice,
    creator: creatorSlice,
    walletconnection: walletConnectionSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
