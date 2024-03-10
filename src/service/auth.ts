import axios from 'axios';
import { CONFIG_API } from 'src/configs/api';
import { TLoginAuth, TRegisterAuth } from 'src/types/auth';
import instanceAxios from 'src/helper/aixos';

export const loginAuth = async (data: TLoginAuth) => {
    try {
        // const res = await axios.post(`${CONFIG_API.AUTH.INDEX}/login`, data);
        const res = await instanceAxios.post(`${CONFIG_API.AUTH.INDEX}/login`, data);

        return res.data;
    } catch (e) {
        return null;
    }
};

export const logoutAuth = async () => {
    try {
        // const res = await axios.post(`${CONFIG_API.AUTH.INDEX}/logout`);
        const res = await instanceAxios.post(`${CONFIG_API.AUTH.INDEX}/logout`);

        return res.data;
    } catch (e) {
        return null;
    }
};

export const registerAuth = async (data: TRegisterAuth) => {
    try {
        const res = await axios.post(`${CONFIG_API.AUTH.INDEX}/register`, data);

        return res.data;
    } catch (e) {
        return e;
    }
};
