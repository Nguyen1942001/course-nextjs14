import React from 'react';
import IconButton from '@mui/material/IconButton';
import Icon from 'src/components/Icon';
import { styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { LANGUAGE_OPTIONS } from 'src/configs/i18n';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

type TProps = {};

interface TStyledItem extends BoxProps {
    selected: boolean;
}

const StyledItemLanguage = styled(Box)<TStyledItem>(({ theme, selected }) => {
    console.log('selected', { selected });

    return {
        cursor: 'pointer',
        '.MuiTypography-root': {
            padding: '8px 12px',
        },
    };
});

const LanguageDropdown = (props: TProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const { i18n } = useTranslation();

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleOnChangeLang = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                color="inherit"
                onClick={handleOpen}
                id="language-dropdown"
            >
                <Icon icon="ic:outline-translate" />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {LANGUAGE_OPTIONS.map((lang) => (
                    <MenuItem
                        onClick={() => handleOnChangeLang(lang.value)}
                        key={lang.value}
                        selected={lang.value === i18n.language}
                    >
                        {lang.lang}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default LanguageDropdown;
