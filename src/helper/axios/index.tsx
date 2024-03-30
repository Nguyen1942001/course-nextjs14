import axios from 'axios';
import { BASE_URL, CONFIG_API } from 'src/configs/api';
import {
    clearLocalUserData,
    clearTemporaryToken,
    getLocalUserData,
    getTemporaryToken,
    setLocalUserData,
    setTemporaryToken,
} from 'src/helper/storage';
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
    clearTemporaryToken();
};

type TAxiosInterceptor = {
    children: ReactNode;
};

const AxiosInterceptor: FC<TAxiosInterceptor> = ({ children }) => {
    const router = useRouter();
    const { setUser, user } = useAuth();

    // Khi sử dụng instanceAxios để gọi api, chỉ có phần code bên dưới sẽ chạy, còn code ở trên chỉ
    // chạy lần đầu tiên khi mới vào web
    instanceAxios.interceptors.request.use(async (config) => {
        // Lấy 2 token mới nhất mỗi khi gọi api bằng instanceAxios
        const { accessToken, refreshToken } = getLocalUserData();
        const { temporaryToken } = getTemporaryToken();

        if (accessToken || temporaryToken) {
            let decodedAccessToken: any = {};

            if (accessToken) {
                decodedAccessToken = jwtDecode(accessToken);
            } else if (temporaryToken) {
                decodedAccessToken = jwtDecode(temporaryToken);
            }

            if (decodedAccessToken?.exp > Date.now() / 1000) {
                // access token còn hạn thì thêm vào header
                config.headers['Authorization'] = `Bearer ${accessToken ?? temporaryToken}`;
            } else {
                // access token hết hạn thì dùng refresh token để tạo mơi access token
                if (refreshToken) {
                    const decodedRefreshToken: any = jwtDecode(refreshToken);

                    if (decodedRefreshToken?.exp > Date.now() / 1000) {
                        // Call api to get new access token
                        await axios
                            .post(
                                `${CONFIG_API.AUTH.INDEX}/refresh-token`,
                                {},
                                {
                                    headers: {
                                        Authorization: `Bearer ${refreshToken}`,
                                    },
                                }
                            )
                            .then((res) => {
                                const newAccessToken = res?.data?.data?.access_token;

                                // If get new access_token successfully, assign to header
                                if (newAccessToken) {
                                    config.headers['Authorization'] = `Bearer ${newAccessToken}`;

                                    if (accessToken) {
                                        setLocalUserData(
                                            JSON.stringify(user),
                                            newAccessToken,
                                            refreshToken
                                        );
                                    } else {
                                        setLocalUserData(JSON.stringify(user), '', refreshToken);
                                        setTemporaryToken(newAccessToken);
                                    }
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
