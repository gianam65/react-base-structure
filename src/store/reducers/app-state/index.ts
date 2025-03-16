import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchCreate, fetchList, fetchUpdate } from './actions';

export interface IAppStateError {
    msg: string;
    type: 'gtm_id' | 'events';
}
export interface IAppStateState {
    savedState: object;
    showBanner: boolean;
    _id: string;
    status: 'idle' | 'loading' | 'failed';
    errors: IAppStateError[];
    configuredChannels: {
        tiktok: boolean;
        googleAnalytics: boolean;
        facebook: boolean;
        pinterest: boolean;
        twitter: boolean;
        snapchat: boolean;
    };
}

const initialState: IAppStateState = {
    savedState: {},
    showBanner: true,
    _id: '',
    status: 'idle',
    errors: [],
    configuredChannels: {
        tiktok: false,
        googleAnalytics: false,
        facebook: false,
        pinterest: false,
        twitter: false,
        snapchat: false,
    },
};

export const appStateSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        updateAppState: (state, action) => {
            return { ...state, ...action.payload };
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCreate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCreate.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(
                fetchCreate.fulfilled,
                (state, action: PayloadAction<IAppStateState>) => {
                    return {
                        ...state,
                        ...action.payload,
                        status: 'idle',
                        savedState: { ...action.payload },
                    };
                },
            )
            .addCase(fetchList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(
                fetchList.fulfilled,
                (state, action: PayloadAction<IAppStateState>) => {
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
export const { updateAppState } = appStateSlice.actions;

export default appStateSlice.reducer;
