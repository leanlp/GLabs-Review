import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAdvancedAnalytics, TRaffle, TUser } from "types";
import { TBasicAnalytics } from "../../types/index";

interface ICreatorState {
  participants: TUser[];
  raffles: TRaffle[];
  basicAnalytics?: TBasicAnalytics;
  advancedAnalytics?: TAdvancedAnalytics;
}

const initialState: ICreatorState = {
  participants: [],
  raffles: [],
};

const creatorSlice = createSlice({
  name: "creator",
  initialState,
  reducers: {
    setParticipants(state, action: PayloadAction<TUser[]>) {
      state.participants = action.payload;
    },
    setCreatorRaffles(state, action: PayloadAction<TRaffle[]>) {
      state.raffles = action.payload;
    },
    setBasicAnalytics(state, action: PayloadAction<TBasicAnalytics>) {
      state.basicAnalytics = action.payload;
    },
    setAdvancedAnalytics(state, action: PayloadAction<TAdvancedAnalytics>) {
      state.advancedAnalytics = action.payload;
    },
  },
});

export const {
  setParticipants,
  setCreatorRaffles,
  setAdvancedAnalytics,
  setBasicAnalytics,
} = creatorSlice.actions;

export default creatorSlice.reducer;
