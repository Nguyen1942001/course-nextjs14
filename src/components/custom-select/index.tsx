import { styled } from '@mui/material/styles';
import { InputLabel, InputLabelProps, MenuItemProps, Select, SelectProps } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';

interface TCustomSelect extends SelectProps {
    options: { label: string; value: string }[];
}

const StyledSelect = styled(Select)<SelectProps>(({ theme }) => ({
    '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input': {
        padding: '4px 8px 8px 10px',
        height: '38px',
        boxSizing: 'border-box',
    },
    legend: {
        display: 'none',
    },
    '.MuiOutlinedInput-notchedOutline': {
        top: '-4px',
        bottom: '2px',
    },
    '.MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium': {
        top: 'calc(50% - .6em)',
    },
}));

const CustomPlaceholder = styled(InputLabel)<InputLabelProps>(({ theme }) => ({
    position: 'absolute',
    top: '8px',
    left: '10px',
}));

const StyledMenuItem = styled(MenuItem)<MenuItemProps>(({ theme }) => ({}));

const CustomSelect = (props: TCustomSelect) => {
    const { value, label, onChange, fullWidth, placeholder, options, ...rest } = props;
    const { t } = useTranslation();

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                position: 'relative',
            }}
        >
            {((Array.isArray(value) && !value.length) || !value) && (
                <CustomPlaceholder>{placeholder}</CustomPlaceholder>
            )}

            <StyledSelect
                fullWidth={fullWidth}
                value={value}
                label={label}
                onChange={onChange}
                {...rest}
            >
                {options.length > 0 ? (
                    options.map((opt) => {
                        return (
                            <StyledMenuItem
                                key={opt.value}
                                value={opt.value}
                            >
                                {opt.label}
                            </StyledMenuItem>
                        );
                    })
                ) : (
                    <StyledMenuItem>{t('no_data')}</StyledMenuItem>
                )}
            </StyledSelect>
        </Box>
    );
};

export default CustomSelect;
