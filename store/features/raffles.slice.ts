import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TRaffle } from "types";
import moment from "moment";

export const SORT_RAFFLES = {
  TIME_LEFT: {
    type: "time-left",
    label: "Time Left",
  },
  // PARTICIPANTS: {
  //   type: "participants",
  //   label: "Participants",
  // },
  WINNERS: {
    type: "winners",
    label: "Winners",
  },
} as const;

export const FILTER_RAFFLES = {
  ACTIVE: {
    type: "active",
    label: "Active Raffles",
  },
  ENTERED: {
    type: "entered",
    label: "Only Raffles Entered",
  },
} as const;

export type TFilterRaffles =
  typeof FILTER_RAFFLES[keyof typeof FILTER_RAFFLES]["type"];

export type TSortRaffles =
  typeof SORT_RAFFLES[keyof typeof SORT_RAFFLES]["type"];

interface IRafflesState {
  raffles: TRaffle[];
  enteredRaffles: TRaffle[];
  filter: {
    type: TFilterRaffles;
  };
  selectedRaffleId: string;
  isNextRaffleExist: boolean;
  isPrevRaffleExist: boolean;
  selectedRaffle?: TRaffle;
  sort: {
    type: TSortRaffles;
    order: "asc" | "desc";
  };
}

const initialState: IRafflesState = {
  raffles: [],
  enteredRaffles: [],
  isNextRaffleExist: false,
  isPrevRaffleExist: false,
  selectedRaffleId: "",
  sort: {
    type: "time-left",
    order: "asc",
  },
  filter: {
    type: "active",
  },
};

const rafflesSlice = createSlice({
  name: "participant",
  initialState,
  reducers: {
    setRaffles(state, action: PayloadAction<any[]>) {
      state.raffles = action.payload;
    },
    setSelectedRaffleId(state, action: PayloadAction<string | undefined>) {
      state.selectedRaffleId = action.payload ?? "";
      const raffleIndex = state.raffles.findIndex(
        (raffle) => raffle._id === state.selectedRaffleId
      );
      state.isNextRaffleExist = raffleIndex < state.raffles.length - 1;
      state.isPrevRaffleExist = raffleIndex > 0;
    },
    setSelectedRaffle(state, action: PayloadAction<TRaffle | undefined>) {
      state.selectedRaffle = action.payload;
    },
    nextRaffle(state) {
      const raffleIndex = state.raffles.findIndex(
        (raffle) => raffle._id === state.selectedRaffleId
      );
      if (raffleIndex < state.raffles.length - 1) {
        state.selectedRaffleId = state.raffles[raffleIndex + 1]._id;
      }
    },
    setEnteredRaffles(state, action: PayloadAction<TRaffle[]>) {
      state.enteredRaffles = action.payload;
    },
    sortRaffles(
      state,
      action: PayloadAction<{
        sortType: TSortRaffles;
      }>
    ) {
      const type = action.payload.sortType;

      switch (type) {
        case "time-left":
          state.raffles.sort((a, b) => {
            if (state.sort.order === "asc" && type === state.sort.type) {
              return moment(a.raffleDetails.endDate).isSameOrAfter(
                moment(b.raffleDetails.endDate)
              )
                ? 1
                : -1;
            } else {
              return moment(b.raffleDetails.endDate).isSameOrAfter(
                moment(a.raffleDetails.endDate)
              )
                ? 1
                : -1;
            }
          });
          break;
        // case "participants":
        //   state.raffles.sort((a, b) => {
        //     if (state.sort.order === "asc" && type === state.sort.type) {
        //       return a.participants.length > b.participants.length ? 1 : -1;
        //     } else {
        //       return b.participants.length > a.participants.length ? 1 : -1;
        //     }
        //   });
          break;
        case "winners":
          state.raffles.sort((a, b) => {
            if (state.sort.order === "asc" && type === state.sort.type) {
              return a.raffleDetails.numberOfWinners >
                b.raffleDetails.numberOfWinners
                ? 1
                : -1;
            } else {
              return b.raffleDetails.numberOfWinners >
                a.raffleDetails.numberOfWinners
                ? 1
                : -1;
            }
          });
          break;
        default:
          console.warn("Unknown sort type");
          break;
      }
      if (state.sort.type !== type) {
        state.sort.order = "asc";
      } else {
        state.sort.order = state.sort.order === "asc" ? "desc" : "asc";
      }
      state.sort.type = action.payload.sortType;
    },
    filterRaffles: (
      state,
      action: PayloadAction<{
        type: TFilterRaffles;
      }>
    ) => {
      state.filter.type = action.payload.type;
    },
  },
});

export const {
  setRaffles,
  setSelectedRaffleId,
  nextRaffle,
  setSelectedRaffle,
  sortRaffles,
  filterRaffles,
  setEnteredRaffles,
} = rafflesSlice.actions;

export default rafflesSlice.reducer;
