"use client";

// REACT REDUX
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

// ICONS
import { BiLoader } from "react-icons/bi";

// Reduces
import cartReducer from "./cart/cart";
import storage from "./storage/storage";
import editReducer from "./edit/edit";
// import storageSession from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "cart",
  storage: storage,
};

// CART REDUCER
const persistedCartReducer = persistReducer(persistConfig, cartReducer);

// EDIT REDUCER
const persistedEditReducer = persistReducer(persistConfig, editReducer);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    editData: persistedEditReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Redux Provider Wrapper
export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
            <BiLoader className="animate-spin size-32" />
          </div>
        }
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
