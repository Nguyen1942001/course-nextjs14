// ** Mui Imports

import React from 'react';
import { TextFieldProps, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

/*
 * ({ theme }) => { ... }: Hàm này nhận theme của Material-UI làm tham số và trả về object chứa các kiểu CSS
 *
 * */
const TextFieldStyled = styled(TextField)<TextFieldProps>(({ theme }) => {
    console.log(theme);

    return {
        '& .MuiFormLabel-root': {
            transform: 'none',
            lineHeight: 1.2,
            position: 'relative',
            marginBottom: theme.spacing(1), // src/theme/spacing/index.ts
            fontSize: theme.typography.body2.fontSize, // src/theme/typography/index.ts
        },
        '& .MuiInputBase-root': {
            borderRadius: 8, // 8px
            backgroundColor: 'transparent !important',
            border: `1px solid rgba(${theme.palette.customColors.main}, 0.2)`, // src/theme/palette/index.ts
            transition: theme.transitions.create(['border-color', 'box-shadow'], {
                duration: theme.transitions.duration.shorter,
            }),

            // Làm mất gạch chân màu tím của ô input khi click chuột vào
            '&:before, &:after': {
                display: 'none',
            },

            // Custom cho thẻ input
            '.MuiInputBase-input': {
                padding: '8px 10px',
            },

            '&.Mui-error': {
                borderColor: theme.palette.error.main,
            },

            '&.Mui-focused': {
                boxShadow: theme.shadows[2],
                '& .MuiInputBase-input:not(.MuiInputBase-readOnly):not([readonly])::placeholder': {
                    transform: 'translateX(4px)',
                },
                '&.MuiInputBase-colorPrimary': {
                    borderColor: theme.palette.primary.main,
                },
                '&.MuiInputBase-colorSecondary': {
                    borderColor: theme.palette.secondary.main,
                },
                '&.MuiInputBase-colorInfo': {
                    borderColor: theme.palette.info.main,
                },
                '&.MuiInputBase-colorSuccess': {
                    borderColor: theme.palette.success.main,
                },
                '&.MuiInputBase-colorWarning': {
                    borderColor: theme.palette.warning.main,
                },
                '&.MuiInputBase-colorError': {
                    borderColor: theme.palette.error.main,
                },
                '&.Mui-error': {
                    borderColor: theme.palette.error.main,
                },
            },
            '&.Mui-disabled': {
                backgroundColor: `${theme.palette.action.selected} !important`,
            },
            '& .MuiInputAdornment-root': {
                marginTop: `0 !important`,
            },
        },
    };
});

const CustomTextField = (props: TextFieldProps) => {
    const { size = 'small', InputLabelProps, variant = 'filled', ...rest } = props;

    return (
        <TextFieldStyled
            size={size}
            InputLabelProps={{ ...InputLabelProps, shrink: true }}
            variant={variant}
            {...rest}
        />
    );
};

export default CustomTextField;
