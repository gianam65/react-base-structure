import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchList, fetchUpdate } from './actions';

export interface IAuthenticateState {
  savedState: object;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: IAuthenticateState = {
  savedState: {},
  status: 'idle',
};

export const authenticateSlice = createSlice({
  name: 'authenticate',
  initialState,
  reducers: {
    updateAuthenticate: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchList.fulfilled,
        (state, action: PayloadAction<IAuthenticateState>) => {
          return {
            ...state,
            ...action.payload,
            status: 'idle',
            savedState: { ...action.payload },
          };
        },
      )
      .addCase(fetchList.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchUpdate.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          status: 'idle',
          savedState: { ...action.payload },
        };
      });
  },
});

// Action creators are generated for each case reducer function
export const { updateAuthenticate } = authenticateSlice.actions;

export default authenticateSlice.reducer;
