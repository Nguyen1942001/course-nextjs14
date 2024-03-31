import MyProfilePage from 'src/views/pages/my-profile';
import { ReactNode } from 'react';
import LayoutNotApp from 'src/views/layouts/LayoutNotApp';

const Index = () => {
    return <MyProfilePage />;
};

export default Index;

Index.getLayout = (page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>;
