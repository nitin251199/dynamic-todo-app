import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rootReducer from "./reducer"; // Import your root reducer
import tempReducer from "./reducer/temp"; // Import your root reducer

const persistConfig = {
  key: "1",
  storage: AsyncStorage,
  whitelist: ["root"],
};

const combinedReducer = combineReducers({
  root: rootReducer,
  temp: tempReducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
