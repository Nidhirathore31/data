import { configureStore } from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage";
import { persistReducer } from 'redux-persist';
import rootReducers from './CombineReducer';

const persistConfig = {
  key: "root",
  storage
}

const persistedReducers = persistReducer(persistConfig, rootReducers)
const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
export default store