// ** React Imports
import { ReactElement, ReactNode, useEffect } from 'react';
import { ACCESS_TOKEN, USER_DATA } from 'src/configs/auth';
import { useAuth } from 'src/hooks/useAuth';
import { useRouter } from 'next/router';

interface GuestGuardProps {
    children: ReactNode;
    fallback: ReactElement | null;
}

const GuestGuard = (props: GuestGuardProps) => {
    const { children, fallback } = props;
    const authContext = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Khi component chưa được first render (render lần đầu) thì không làm gì nữa
        if (!router.isReady) {
            return;
        }

        if (window.localStorage.getItem(ACCESS_TOKEN) && window.localStorage.getItem(USER_DATA)) {
            router.replace('/');
        }
    }, [router.route]);

    // if bên dưới sẽ chạy trước useEffect ở trên
    if (authContext.loading && !authContext.loading && authContext.user !== null) {
        return fallback;
    }

    return <>{children}</>;
};

export default GuestGuard;
