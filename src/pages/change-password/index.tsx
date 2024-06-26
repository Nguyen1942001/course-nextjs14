import { NextPage } from 'next';
import { ReactNode } from 'react';
import ChangePasswordPage from 'src/views/pages/change-password';
import LayoutNotApp from 'src/views/layouts/LayoutNotApp';

type TProps = {};

const Index: NextPage<TProps> = () => {
    return <ChangePasswordPage />;
};

export default Index;

Index.getLayout = (page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>;
