// ** Redux Imports
import { Dispatch } from 'redux';
import { createSlice } from '@reduxjs/toolkit';

// ** Axios Imports
import {
    changePasswordMeAsync,
    registerAuthAsync,
    updateAuthMeAsync,
} from 'src/stores/apps/auth/action';

interface DataParams {
    q: string;
    role: string;
    status: string;
    currentPlan: string;
}

interface Redux {
    getState: any;
    dispatch: Dispatch<any>;
}

const initialState = {
    isLoading: false,
    isSuccess: true,
    isError: false,
    message: '',
    typeError: '',

    isSuccessUpdateMe: true,
    isErrorUpdateMe: false,
    messageUpdateMe: '',

    isSuccessChangePasswordMe: true,
    isErrorChangePasswordMe: false,
    messageChangePasswordMe: '',
};

export const authsSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetInitialState: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = '';
            state.typeError = '';

            state.isSuccessUpdateMe = false;
            state.isErrorUpdateMe = true;
            state.messageUpdateMe = '';

            state.isSuccessChangePasswordMe = false;
            state.isErrorChangePasswordMe = true;
            state.messageChangePasswordMe = '';
        },
    },
    extraReducers: (builder) => {
        // ** register

        // pending: đang xử lý
        builder.addCase(registerAuthAsync.pending, (state, action) => {
            state.isLoading = true;
        });

        // fulfilled: xử lý thành công
        builder.addCase(registerAuthAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = !!action.payload?.data?.email; // !!: chuyển sang dạng boolean
            state.isError = !action.payload?.data?.email;
            state.message = action.payload?.message;
            state.typeError = action.payload?.typeError;
        });

        // rejected: xử lý thất bại
        builder.addCase(registerAuthAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = '';
            state.typeError = '';
        });

        // ** update me
        builder.addCase(updateAuthMeAsync.pending, (state, action) => {
            state.isLoading = true;
        });

        builder.addCase(updateAuthMeAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccessUpdateMe = !!action.payload?.data?.email; // !!: chuyển sang dạng boolean
            state.isErrorUpdateMe = !action.payload?.data?.email;
            state.messageUpdateMe = action.payload?.message;
            state.typeError = action.payload?.typeError;
        });

        builder.addCase(updateAuthMeAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccessUpdateMe = false;
            state.isErrorUpdateMe = true;
            state.messageUpdateMe = '';
            state.typeError = '';
        });

        // ** change password me
        builder.addCase(changePasswordMeAsync.pending, (state, action) => {
            state.isLoading = true;
        });

        builder.addCase(changePasswordMeAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccessChangePasswordMe = !!action.payload?.data; // !!: chuyển sang dạng boolean
            state.isErrorChangePasswordMe = !action.payload?.data;
            state.messageChangePasswordMe = action.payload?.message;
            state.typeError = action.payload?.typeError;
        });

        builder.addCase(changePasswordMeAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccessChangePasswordMe = false;
            state.isErrorChangePasswordMe = true;
            state.messageChangePasswordMe = '';
            state.typeError = '';
        });
    },
});

export const { resetInitialState } = authsSlice.actions;
export default authsSlice.reducer;
