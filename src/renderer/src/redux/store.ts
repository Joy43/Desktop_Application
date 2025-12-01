import { configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { baseAPI } from './api/baseApi'
import authReducer from './features/auth/auth.slice'
import bookMarkReducer from './features/bookmark/bookmark.slice'




const persistConfig = {
  key: 'auth',
  storage
}
const bookMarkConfig = {
  key: 'bookmark',
  storage
}

const persistedReducer = persistReducer(persistConfig, authReducer)
const persistBookMarkReducer = persistReducer(bookMarkConfig, bookMarkReducer)


export const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
    auth: persistedReducer,
    bookMark: persistBookMarkReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(baseAPI.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)