import * as React from 'react';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { NextPage } from 'next';
import HorizontalLayout from 'src/views/layouts/HorizontalLayout';
import VerticalLayout from 'src/views/layouts/VerticalLayout';
import { useTheme } from '@mui/material/styles';

type TProps = {
    children: React.ReactNode;
};

// Component bên dưới dùng để chứa những layout không cần VerticalLayout (side bar)
const LayoutNotApp: NextPage<TProps> = ({ children }) => {
    const theme = useTheme();

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <HorizontalLayout
                open={false}
                toggleDrawer={() => {}}
                isHideMenu
            />

            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container
                    sx={{
                        m: 4,
                        width: 'calc(100vw - 36px)',
                        maxWidth: 'unset !important',
                        overflow: 'auto',
                        padding: 0,
                        borderRadius: '15px',

                        // theme.mixins.toolbar.minHeight là height của HorizontalLayout
                        maxHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight} - 32px)`,
                    }}
                >
                    {children}
                </Container>
            </Box>
        </Box>
    );
};

export default LayoutNotApp;
