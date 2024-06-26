// ** Add User
import { createAsyncThunk } from '@reduxjs/toolkit';
import { changePasswordMe, registerAuth, updateAuthMe } from 'src/service/auth';
import instanceAxios from 'src/helper/axios';

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

export const changePasswordMeAsync = createAsyncThunk(
    'auth/change-password-me',
    async (data: any) => {
        const response = await changePasswordMe(data);
        console.log('response change password', response);

        if (response?.status === 'Success') {
            return { ...response, data: 1 };
        }

        return {
            data: null,
            message: response?.response?.data?.message,
            typeError: response?.response?.data?.typeError,
        };
    }
);
