// ** Redux Imports
import { Dispatch } from 'redux';
import { createSlice } from '@reduxjs/toolkit';

// ** Axios Imports
import { registerAuthAsync, updateAuthMeAsync } from 'src/stores/apps/auth/action';

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
    },
});

export const { resetInitialState } = authsSlice.actions;
export default authsSlice.reducer;
