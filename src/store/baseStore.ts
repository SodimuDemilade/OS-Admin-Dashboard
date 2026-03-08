import {createSlice} from "@reduxjs/toolkit";
import {type AppConfig, appConfig} from "../configs/appConfig.ts";

export type BaseState = {
    appStage: AppConfig["stage"],
    loading: boolean;
};

const initialState: BaseState = {
    appStage: appConfig.stage,
    loading: false,
};

const actions = {}
const baseSlice = createSlice({
    name: "baseStore",
    initialState,
    reducers: {
        setAppStage(state, {payload}: { payload: BaseState["appStage"] }) {
            state.appStage = payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        reset: () => ({...initialState}),
    },
});

export const baseStore = {
    mutation: baseSlice.actions,
    action: actions,
    reducer: baseSlice.reducer,
};
