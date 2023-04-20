import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser, TUserType } from "types";

interface IUserState {
  /**
   * user is an object that contains the user's information
   * @todo add the user's type
   */
  user?: TUser;
  /**
   * userType is a string that contains the user's type
   * @type {"participant" | "creator"}
   */
  userType?: TUserType;
  preferredMintWallet?: string;
}

const initialState: IUserState = {
  user: undefined,
  userType: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<TUser>>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
          type: action.payload.type ?? state.user.type,
        };
      } else {
        state.user = action.payload as TUser;
      }
      if (
        state.user?.primaryWallet !== state.preferredMintWallet ||
        !state.user?.mintWallets.includes(state.preferredMintWallet)
      ) {
        state.preferredMintWallet = state.user?.primaryWallet;
      }
    },
    setUserType: (state, action: PayloadAction<TUserType>) => {
      state.userType = action.payload;
    },
    setPreferredMintWallet: (state, action: PayloadAction<string>) => {
      state.preferredMintWallet = action.payload;
      if (state.user) {
        state.user.preferredMintWallet = action.payload;
      }
    },
  },
});

export const { setUser, setUserType } = userSlice.actions;

export default userSlice.reducer;
