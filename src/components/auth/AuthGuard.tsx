// ** React Imports
import { ReactElement, ReactNode, useEffect } from 'react';
import { useAuth } from 'src/hooks/useAuth';
import { useRouter } from 'next/router';
import { ACCESS_TOKEN, USER_DATA } from 'src/configs/auth';
import { clearLocalUserData } from 'src/helper/storage';

interface AuthGuardProps {
    children: ReactNode;
    fallback: ReactElement | null;
}

const AuthGuard = (props: AuthGuardProps) => {
    const { children, fallback } = props;
    const authContext = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Khi component chưa được first render (render lần đầu) thì không làm gì nữa
        if (!router.isReady) {
            return;
        }

        if (
            authContext.user === null &&
            !window.localStorage.getItem(ACCESS_TOKEN) &&
            !window.localStorage.getItem(USER_DATA)
        ) {
            if (router.asPath !== '/' && router.asPath !== '/login') {
                // Quay về trang login kèm theo tham số returnUrl (trên url) chứa domain trước đó
                router.replace({
                    pathname: '/login',
                    query: { returnUrl: router.asPath },
                });
            } else {
                router.replace('/login');
            }

            // Set user là null và xóa dữ liệu trong local storage
            authContext.setUser(null);
            clearLocalUserData();
        }
    }, [router.route]);

    /**
     * Đang trong quá trình gọi api 'auth/me' để kiểm tra xem có đăng nhập chưa,
     * thì trả về fallback - fallback là 1 cái spinner
     *
     * if bên dưới sẽ chạy trước useEffect ở trên
     */
    if (authContext.loading || authContext.user === null) {
        return fallback;
    }

    return <>{children}</>;
};

export default AuthGuard;
