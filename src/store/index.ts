import {combineReducers} from "@reduxjs/toolkit";
import {authStore} from "./authStore.ts";
import {baseStore} from "./baseStore.ts";
import {BaseService} from "../configs/serviceConfig.ts";

export const rootReducer = combineReducers({
    auth: authStore.reducer,
    base: baseStore.reducer,
    [BaseService.appClient.reducerPath]: BaseService.appClient.reducer,
    // auth: auth.reducer,
})

export type RootState = ReturnType<typeof rootReducer>;
