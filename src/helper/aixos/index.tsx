import axios from 'axios';
import { BASE_URL, CONFIG_API } from 'src/configs/api';
import { clearLocalUserData, getLocalUserData } from 'src/helper/storage';
import { jwtDecode } from 'jwt-decode';
import { FC, ReactNode } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { UserDataType } from 'src/contexts/types';
import { useAuth } from 'src/hooks/useAuth';

const instanceAxios = axios.create({ baseURL: BASE_URL });

const handleRedirectLogin = (router: NextRouter, setUser: (data: UserDataType | null) => void) => {
    if (router.asPath !== '/') {
        router.replace({
            pathname: '/login',
            query: {
                returnUrl: router.asPath,
            },
        });
    } else {
        router.replace('/login');
    }

    // Set user là null và xóa dữ liệu trong local storage
    setUser(null);
    clearLocalUserData();
};

type TAxiosInterceptor = {
    children: ReactNode;
};

const AxiosInterceptor: FC<TAxiosInterceptor> = ({ children }) => {
    const { accessToken, refreshToken } = getLocalUserData();
    const router = useRouter();
    const { setUser } = useAuth();

    instanceAxios.interceptors.request.use(async (config) => {
        if (accessToken) {
            const decodedAccessToken: any = jwtDecode(accessToken);

            if (decodedAccessToken?.exp > Date.now() / 1000) {
                // access token còn hạn thì thêm vào header
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            } else {
                if (refreshToken) {
                    const decodedRefreshToken: any = jwtDecode(refreshToken);

                    if (decodedRefreshToken?.exp > Date.now() / 1000) {
                        // Call api to get new access token
                        await axios
                            .post(`${CONFIG_API.AUTH.INDEX}/refresh-token`, {
                                headers: {
                                    Authorizaton: `Bearer ${refreshToken}`,
                                },
                            })
                            .then((res) => {
                                const newAccessToken = res?.data?.data?.access_token;

                                // If get new access_token successfully, assign to header
                                if (newAccessToken) {
                                    config.headers['Authorization'] = `Bearer ${newAccessToken}`;
                                } else {
                                    handleRedirectLogin(router, setUser);
                                }
                            })
                            .catch((e) => {
                                handleRedirectLogin(router, setUser);
                            });
                    } else {
                        // Redirect to '/login'
                        handleRedirectLogin(router, setUser);
                    }
                } else {
                    // Redirect to '/login'
                    handleRedirectLogin(router, setUser);
                }
            }
        } else {
            // Redirect to '/login'
            handleRedirectLogin(router, setUser);
        }

        return config;
    });

    instanceAxios.interceptors.response.use((response) => {
        return response;
    });

    return <>{children}</>;
};

export default instanceAxios;
export { AxiosInterceptor };
