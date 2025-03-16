import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  fetchList,
  fetchUpdate,
  checkEnabledThemeExtension,
  activateThemeExtensionLink,
} from "./actions";

export interface IUserState {
  savedState: object;
  _id: string;
  status: "idle" | "loading" | "failed";
  enableThemeExt: boolean;
  name: string;
}

const initialState: IUserState = {
  savedState: {},
  _id: "0",
  status: "idle",
  enableThemeExt: false,
  name: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetUser: () => {
      return { ...initialState };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchList.fulfilled,
        (state, action: PayloadAction<IUserState>) => {
          return {
            ...state,
            ...action.payload,
            status: "idle",
            savedState: { ...action.payload },
          };
        },
      )
      .addCase(fetchList.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(checkEnabledThemeExtension.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkEnabledThemeExtension.fulfilled, (state, action) => {
        state.status = "idle";
        state.enableThemeExt = action.payload;
      })
      .addCase(checkEnabledThemeExtension.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(activateThemeExtensionLink.pending, (state) => {
        state.status = "loading";
      })
      .addCase(activateThemeExtensionLink.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(activateThemeExtensionLink.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchUpdate.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          status: "idle",
          savedState: { ...action.payload },
        };
      });
  },
});

// Action creators are generated for each case reducer function
export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
