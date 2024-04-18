// ** Import Next

import { NextPage } from 'next';
import RegisterPage from 'src/views/pages/register';
import { ReactNode } from 'react';
import BlankLayout from 'src/views/layouts/BlankLayout';

type TProps = {};

const ManageSystem: NextPage<TProps> = () => {
    return <RegisterPage />;
};

export default ManageSystem;

// ManageSystem.guestGuard = true;
