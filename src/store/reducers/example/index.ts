import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchCreate, fetchList, fetchUpdate } from "./actions";

export interface IExampleError {
  msg: string;
  type: "gtm_id" | "events";
}
export interface IExampleState {
  savedState: object;
  _id: string;
  status: "idle" | "loading" | "failed";
  errors: IExampleError[];
}

const initialState: IExampleState = {
  savedState: {},
  _id: "",
  status: "idle",
  errors: [],
};

export const exampleSlice = createSlice({
  name: "example",
  initialState,
  reducers: {
    updateExample: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetExample: () => {
      return { ...initialState };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCreate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCreate.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(
        fetchCreate.fulfilled,
        (state, action: PayloadAction<IExampleState>) => {
          return {
            ...state,
            ...action.payload,
            status: "idle",
            savedState: { ...action.payload },
          };
        },
      )
      .addCase(fetchList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchList.fulfilled,
        (state, action: PayloadAction<IExampleState>) => {
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
export const { updateExample } = exampleSlice.actions;

export default exampleSlice.reducer;
