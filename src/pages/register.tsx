// ** Import Next

import { NextPage } from 'next';
import RegisterPage from 'src/views/pages/register';
import { ReactNode } from 'react';
import BlankLayout from 'src/views/layouts/BlankLayout';
import Login from 'src/pages/login';

type TProps = {};

const Register: NextPage<TProps> = () => {
    return <RegisterPage />;
};

export default Register;

/**
 * Code bên dưới dùng để render ra layout rỗng khi load component Register
 * Layout rỗng chứa component Register
 * Ngăn chặn load VerticalLayout (sidebar) và HorizontalLayout (header)
 * getLayout là biến nằm ở file src/pages/_app.tsx
 */
Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

// Trang này không cần đăng nhập vẫn vào được
Register.guestGuard = true;
