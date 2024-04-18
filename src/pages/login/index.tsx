// ** Import Next

import { NextPage } from 'next';
import LoginPage from 'src/views/pages/login';
import BlankLayout from 'src/views/layouts/BlankLayout';
import { ReactNode } from 'react';

type TProps = {};

const Index: NextPage<TProps> = () => {
    return <LoginPage />;
};

export default Index;

/**
 * Code bên dưới dùng để render ra layout rỗng khi load component Index
 * Layout rỗng chứa component Index
 * Ngăn chặn load VerticalLayout (sidebar) và HorizontalLayout (header)
 * getLayout là biến nằm ở file src/pages/_app.tsx
 */
Index.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

// Trang này không cần đăng nhập vẫn vào được
Index.guestGuard = true;
