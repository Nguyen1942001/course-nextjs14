// ** Add User
import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerAuth, updateAuthMe } from 'src/service/auth';

export const registerAuthAsync = createAsyncThunk('auth/register', async (data: any) => {
    const response = await registerAuth(data);
    console.log('response', response);

    if (response?.data) {
        return response;
    }

    return {
        data: null,
        message: response?.response?.data?.message,
        typeError: response?.response?.data?.typeError,
    };
});

export const updateAuthMeAsync = createAsyncThunk('auth/update-me', async (data: any) => {
    const response = await updateAuthMe(data);

    if (response?.data) {
        return response;
    }

    return {
        data: null,
        message: response?.response?.data?.message,
        typeError: response?.response?.data?.typeError,
    };
});
