import {createSlice} from "@reduxjs/toolkit";
import type {ModalEnum} from "../util/enums/modalEnum.ts";

export type ModalState = {
    loading: boolean;
    modalType: ModalEnum | null;
    // prevOpenedModalType: ModalEnum | null;
    isOpen: boolean;
    data?: any; // new property to store arbitrary data, basically data entering the modal.
    modalId?: string; // optional ID if ephemeral callbacks/promise-based usage
};

const initialState: ModalState = {
    loading: false,
    modalType: null,
    // prevOpenedModalType: null,
    isOpen: false,
    data: null,
    modalId: undefined,
};

const action = {};
const slice = createSlice({
    name: "modalStore",
    initialState,
    reducers: {
        openModal(
            state,
            {payload}: { payload: { modalType: ModalEnum; data?: any; modalId?: string; } }
        ) {
            state.modalType = payload?.modalType;
            state.isOpen = true;
            state.data = payload?.data ?? null;
            state.modalId = payload?.modalId;
            // state.prevOpenedModalType = payload?.prevOpenedModalType
        },
        closeModal: (state) => {
            state.modalType = null;
            state.isOpen = false;
            state.data = null;
            state.modalId = undefined;
            // state.prevOpenedModalType =
        },
        reset: () => ({...initialState}),
    },
});

export const modalStore = {
    reducer: slice.reducer,
    mutation: slice.actions,
    action: action,
};
