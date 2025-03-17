import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { appStateReducer, userReducer } from "./reducers";
import { persistReducer, persistStore } from "redux-persist";
import { createCustomStorage } from "./custom-storage";
import { combineReducers } from "@reduxjs/toolkit";

let currentStorageType: "local" | "session" | "cookie" = "local";
export const setStorageType = (type: "local" | "session" | "cookie") => {
  currentStorageType = type;
  // Reinitialize the store or update the storage dynamically
};

const customStorage = createCustomStorage(currentStorageType);

const persistConfig = {
  key: "root",
  storage: customStorage,
  // whitelist: ["user"], // Only persist the 'user' reducer
  // blacklist: ['user'], // user will not be persisted
};

// Combine reducers
const rootReducer = combineReducers({
  appState: appStateReducer,
  user: userReducer,
});

// Wrap root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(thunk),
});

// Create a persistor object
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// export const selectCount = (state: RootState) => state.generalSetting

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
