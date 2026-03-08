import {configureStore, type Dispatch} from "@reduxjs/toolkit";
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import {setupListeners} from "@reduxjs/toolkit/query";
import {BaseService} from "./serviceConfig";
import {rootReducer} from "../store";


// Non-persisted reducers (API cache shouldn't be persisted)
const nonPersistedReducers = [BaseService.appClient.reducerPath];
const persistConfig = {
    key: 'root',
    storage,
    blacklist: nonPersistedReducers, // Don't persist API cache
};

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(
    persistConfig,
    rootReducer,
)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
            .concat(BaseService.appClient.middleware),
})

// Fix circular dependency
// injectStore(store);

// // Enable listeners for auto-refetching
setupListeners(store.dispatch);

export const persistor = persistStore(store);


export type ThunkApiConfig = {
    state?: unknown
    dispatch?: Dispatch
    extra?: unknown
    rejectValue?: unknown
    serializedErrorType?: unknown
    pendingMeta?: unknown
    fulfilledMeta?: unknown
    rejectedMeta?: unknown
}
export type AppDispatch = typeof store.dispatch
