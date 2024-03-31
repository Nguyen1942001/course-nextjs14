'use client';

import { NextPage } from 'next';
import Link from 'next/link';

import CssBaseline from '@mui/material/CssBaseline';
import { Button, IconButton, InputAdornment } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomTextField from 'src/components/text-field';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PASSWORD_REG } from 'src/configs/regex';
import { useEffect, useState } from 'react';
import Icon from 'src/components/Icon';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import RegisterDark from '/public/images/register-dark.png';
import RegisterLight from '/public/images/register-light.png';
import { useDispatch, useSelector } from 'react-redux';
import { registerAuthAsync } from 'src/stores/apps/auth/action';
import { AppDispatch, RootState } from 'src/stores';
import { isSchema } from 'yup';
import toast from 'react-hot-toast';
import FallbackSpinner from 'src/components/fall-back';
import { resetInitialState } from 'src/stores/apps/auth';
import { useRouter } from 'next/router';
import { ROUTE_CONFIG } from 'src/configs/route';

type TProps = {};
type TDefaultValue = {
    email: string;
    password: string;
    confirmPassword: string;
};

const RegisterPage: NextPage<TProps> = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Router
    const router = useRouter();

    // Redux
    const dispatch: AppDispatch = useDispatch();
    const { isLoading, isError, isSuccess, message } = useSelector(
        (state: RootState) => state.auth
    );

    const defaultValue: TDefaultValue = {
        email: '',
        password: '',
        confirmPassword: '',
    };

    // Theme
    const theme = useTheme();

    const schema = yup.object().shape({
        email: yup
            .string()
            .email('The field must be in email type')
            .required('The field is required'),
        password: yup
            .string()
            .required('The field is required')
            .matches(PASSWORD_REG, 'The password is contain character, special character, number'),
        confirmPassword: yup
            .string()
            .required('The field is required')
            .matches(PASSWORD_REG, 'The password is contain character, special character, number')
            .oneOf([yup.ref('password'), ''], 'The confirm password must match with password'),
    });

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: defaultValue,
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: { email: string; password: string }) => {
        if (!Object.keys(errors).length) {
            dispatch(registerAuthAsync({ email: data.email, password: data.password }));
        }
    };

    useEffect(() => {
        if (message) {
            if (isError) {
                toast.error(message);
            } else if (isSuccess) {
                toast.success(message);
                router.push(ROUTE_CONFIG.LOGIN);
            }

            dispatch(resetInitialState());
        }
    }, [isError, isSuccess, message]);

    return (
        <>
            {isLoading && <FallbackSpinner />}

            <Box
                sx={{
                    height: '100vh',
                    width: '100vw',
                    backgroundColor: theme.palette.background.paper,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '40px',
                }}
            >
                <Box
                    display={{
                        xs: 'none',
                        sm: 'flex',
                    }}
                    sx={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        borderRadius: '20px',
                        backgroundColor: theme.palette.customColors.bodyBg,
                        height: '100%',
                        minWidth: '50vw',
                    }}
                >
                    <Image
                        src={theme.palette.mode === 'light' ? RegisterLight : RegisterDark}
                        alt="login-image"
                        style={{
                            height: '100%',
                            width: 'auto',
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                    }}
                >
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            component="h1"
                            variant="h5"
                        >
                            Register
                        </Typography>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            noValidate
                            autoComplete="off"
                        >
                            <Box sx={{ mt: 2, width: '300px' }}>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <CustomTextField
                                            required
                                            fullWidth
                                            label="Email"
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder="Input email"
                                            error={Boolean(errors?.email)} // error là props của TextFieldProps (MUI)
                                            helperText={errors?.email?.message}
                                        />
                                    )}
                                    name="email"
                                />
                            </Box>

                            <Box sx={{ mt: 2, width: '300px' }}>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <CustomTextField
                                            required
                                            fullWidth
                                            type={showPassword ? 'text' : 'password'}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            edge="end"
                                                            onClick={() => {
                                                                setShowPassword(!showPassword);
                                                            }}
                                                        >
                                                            {showPassword ? (
                                                                <Icon icon="material-symbols:visibility-off-outline" />
                                                            ) : (
                                                                <Icon icon="material-symbols:visibility-outline" />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            label="Password"
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder="Input password"
                                            error={Boolean(errors?.password)} // error là props của TextFieldProps (MUI)
                                            helperText={errors?.password?.message}
                                        />
                                    )}
                                    name="password"
                                />
                            </Box>

                            <Box sx={{ mt: 2, width: '300px' }}>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <CustomTextField
                                            required
                                            fullWidth
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            edge="end"
                                                            onClick={() => {
                                                                setShowConfirmPassword(
                                                                    !showConfirmPassword
                                                                );
                                                            }}
                                                        >
                                                            {showConfirmPassword ? (
                                                                <Icon icon="material-symbols:visibility-off-outline" />
                                                            ) : (
                                                                <Icon icon="material-symbols:visibility-outline" />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            label="Confirm Password"
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder="Enter confirm password"
                                            error={Boolean(errors?.confirmPassword)} // error là props của TextFieldProps (MUI)
                                            helperText={errors?.confirmPassword?.message}
                                        />
                                    )}
                                    name="confirmPassword"
                                />
                            </Box>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Register
                            </Button>

                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography>{'Do you have already account?'}</Typography>

                                <Link
                                    style={{
                                        color:
                                            theme.palette.mode === 'light'
                                                ? theme.palette.common.black
                                                : theme.palette.common.white,
                                    }}
                                    href="/login"
                                >
                                    {'Login'}
                                </Link>
                            </Box>

                            {/*  Login google, facebook  */}
                            <Typography sx={{ textAlign: 'center', mt: 2, mb: 2 }}>Or</Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '20px',
                                }}
                            >
                                <IconButton
                                    sx={{
                                        color: theme.palette.error.main,
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        role="img"
                                        fontSize="1.375rem"
                                        className="iconify iconify--mdi"
                                        width="1em"
                                        height="1em"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81Z"
                                        ></path>
                                    </svg>
                                </IconButton>

                                <IconButton
                                    sx={{
                                        color: '#497ce2',
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        role="img"
                                        fontSize="1.375rem"
                                        className="iconify iconify--mdi"
                                        width="1em"
                                        height="1em"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z"
                                        ></path>
                                    </svg>
                                </IconButton>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default RegisterPage;
