// ** Import Next

import { NextPage } from 'next';
import LoginPage from 'src/views/pages/login';
import BlankLayout from 'src/views/layouts/BlankLayout';
import { ReactNode } from 'react';

type TProps = {};

const Login: NextPage<TProps> = () => {
    return <LoginPage />;
};

export default Login;

/**
 * Code bên dưới dùng để render ra layout rỗng khi load component Login
 * Layout rỗng chứa component Login
 * Ngăn chặn load VerticalLayout (sidebar) và HorizontalLayout (header)
 * getLayout là biến nằm ở file src/pages/_app.tsx
 */
Login.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

// Trang này không cần đăng nhập vẫn vào được
Login.guestGuard = true;
