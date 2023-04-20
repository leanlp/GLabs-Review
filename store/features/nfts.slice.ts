import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TRaffle, TNft } from "types";

interface INftsState {
  nfts: TNft[];
  filter: "listed" | "delisted" | "all";
  filteredNFTs: TNft[];
}

const initialState: INftsState = {
  nfts: [],
  filteredNFTs: [],
  filter: "all",
};

const nftsSlice = createSlice({
  name: "participant",
  initialState,
  reducers: {
    setNFTs(state, action: PayloadAction<TNft[]>) {
      state.nfts = action.payload ?? [];
      if (state.filter === "all") {
        state.filteredNFTs = action.payload ?? [];
      } else if (state.filter === "listed") {
        state.filteredNFTs = action.payload.filter(
          (nft) => nft.status === "Listed"
        );
      } else if (state.filter === "delisted") {
        state.filteredNFTs = state.nfts.filter(
          (nft) => nft.status === "Delisted"
        );
      }
    },
    /**
     * Toggles the listing of an NFT
     * @param state
     * @param action - NFT id
     */
    toggleListing(state, action: PayloadAction<string>) {
      console.warn("TODO - toggleListing");
    },
    /**
     * Filters the NFTs by the given search term
     * @param state
     * @param action - search term (listed or delisted) or undefined for no filtering
     */
    filterNFTs(state, action: PayloadAction<"listed" | "delisted" | "all">) {
      state.filter = action.payload;
      if (state.filter === "all") {
        state.filteredNFTs = state.nfts;
      } else if (state.filter === "listed") {
        state.filteredNFTs = state.nfts.filter(
          (nft) => nft.status === "Listed"
        );
      } else if (state.filter === "delisted") {
        state.filteredNFTs = state.nfts.filter(
          (nft) => nft.status === "Delisted"
        );
      }
    },
    /**
     * Sorts the NFTs by the given sort term
     * @param state
     * @param action - sort term (yield or date) or undefined for no sorting
     */
    sortNFTs(state, action: PayloadAction<"yield" | "date" | undefined>) {
      console.warn("TODO - sortNFTs");
    },
  },
});

export const { setNFTs, toggleListing, filterNFTs, sortNFTs } =
  nftsSlice.actions;

export default nftsSlice.reducer;
