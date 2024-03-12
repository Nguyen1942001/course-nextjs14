// ** Redux Imports
import { Dispatch } from 'redux';
import { createSlice } from '@reduxjs/toolkit';

// ** Axios Imports
import { registerAuthAsync } from 'src/stores/apps/auth/action';

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
        },
    },
    extraReducers: (builder) => {
        // pending: đang xử lý
        builder.addCase(registerAuthAsync.pending, (state, action) => {
            state.isLoading = true;
        });

        // fulfilled: xử lý thành công
        builder.addCase(registerAuthAsync.fulfilled, (state, action) => {
            console.log('action', action);
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
    },
});

export const { resetInitialState } = authsSlice.actions;
export default authsSlice.reducer;
