import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import userReducer from './user/UserSlice'
import taskReducer from './task/TaskSlice'
import { persistReducer, persistStore } from 'redux-persist'

const rootReducer = combineReducers({ user: userReducer, task: taskReducer })
const persistConfig = {
    key: 'root',
    version: 1,
    storage
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export const persistor = persistStore(store)