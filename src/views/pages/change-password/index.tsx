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
import { changePasswordMeAsync, registerAuthAsync } from 'src/stores/apps/auth/action';
import { AppDispatch, RootState } from 'src/stores';
import { isSchema } from 'yup';
import toast from 'react-hot-toast';
import FallbackSpinner from 'src/components/fall-back';
import { resetInitialState } from 'src/stores/apps/auth';
import { useRouter } from 'next/router';
import { ROUTE_CONFIG } from 'src/configs/route';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'src/hooks/useAuth';

type TProps = {};
type TDefaultValue = {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
};

const ChangePasswordPage: NextPage<TProps> = () => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    // Translation
    const { t } = useTranslation();

    // Router
    const router = useRouter();

    // Auth
    const { logout } = useAuth();

    // Redux
    const dispatch: AppDispatch = useDispatch();
    const {
        isLoading,
        isErrorChangePasswordMe,
        isSuccessChangePasswordMe,
        messageChangePasswordMe,
    } = useSelector((state: RootState) => state.auth);

    const defaultValue: TDefaultValue = {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    };

    // Theme
    const theme = useTheme();

    const schema = yup.object().shape({
        currentPassword: yup
            .string()
            .required('The field is required')
            .matches(PASSWORD_REG, 'The password is contain character, special character, number'),
        newPassword: yup
            .string()
            .required('The field is required')
            .matches(PASSWORD_REG, 'The password is contain character, special character, number'),
        confirmNewPassword: yup
            .string()
            .required('The field is required')
            .matches(PASSWORD_REG, 'The password is contain character, special character, number')
            .oneOf(
                [yup.ref('newPassword'), ''],
                'The confirm new password must match with new password'
            ),
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

    const onSubmit = (data: { currentPassword: string; newPassword: string }) => {
        if (!Object.keys(errors).length) {
            dispatch(
                changePasswordMeAsync({
                    currentPassword: data.currentPassword,
                    newPassword: data.newPassword,
                })
            );
        }
    };

    useEffect(() => {
        if (messageChangePasswordMe) {
            if (isErrorChangePasswordMe) {
                toast.error(messageChangePasswordMe);
            } else if (isSuccessChangePasswordMe) {
                toast.success(messageChangePasswordMe);

                setTimeout(() => {
                    logout();
                }, 300);
            }

            dispatch(resetInitialState());
        }
    }, [isErrorChangePasswordMe, isSuccessChangePasswordMe, messageChangePasswordMe]);

    return (
        <>
            {isLoading && <FallbackSpinner />}

            <Box
                sx={{
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
                        height: '75vh',
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
                            {t('Change_password')}
                        </Typography>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            noValidate
                            autoComplete="off"
                        >
                            {/*  Current password  */}
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
                                            type={showCurrentPassword ? 'text' : 'password'}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            edge="end"
                                                            onClick={() => {
                                                                setShowCurrentPassword(
                                                                    !showCurrentPassword
                                                                );
                                                            }}
                                                        >
                                                            {showCurrentPassword ? (
                                                                <Icon icon="material-symbols:visibility-off-outline" />
                                                            ) : (
                                                                <Icon icon="material-symbols:visibility-outline" />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            label={t('Current_password')}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder={t('enter_current_password')}
                                            error={Boolean(errors?.currentPassword)} // error là props của TextFieldProps (MUI)
                                            helperText={errors?.currentPassword?.message}
                                        />
                                    )}
                                    name="currentPassword"
                                />
                            </Box>

                            {/*  New password  */}
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
                                            type={showNewPassword ? 'text' : 'password'}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            edge="end"
                                                            onClick={() => {
                                                                setShowNewPassword(
                                                                    !showNewPassword
                                                                );
                                                            }}
                                                        >
                                                            {showNewPassword ? (
                                                                <Icon icon="material-symbols:visibility-off-outline" />
                                                            ) : (
                                                                <Icon icon="material-symbols:visibility-outline" />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            label={t('New_password')}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder={t('enter_new_password')}
                                            error={Boolean(errors?.newPassword)} // error là props của TextFieldProps (MUI)
                                            helperText={errors?.newPassword?.message}
                                        />
                                    )}
                                    name="newPassword"
                                />
                            </Box>

                            {/*  Confirm new password  */}
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
                                            type={showConfirmNewPassword ? 'text' : 'password'}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            edge="end"
                                                            onClick={() => {
                                                                setShowConfirmNewPassword(
                                                                    !showConfirmNewPassword
                                                                );
                                                            }}
                                                        >
                                                            {showConfirmNewPassword ? (
                                                                <Icon icon="material-symbols:visibility-off-outline" />
                                                            ) : (
                                                                <Icon icon="material-symbols:visibility-outline" />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            label={t('Confirm_new_password')}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder={t('enter_confirm_new_password')}
                                            error={Boolean(errors?.confirmNewPassword)} // error là props của TextFieldProps (MUI)
                                            helperText={errors?.confirmNewPassword?.message}
                                        />
                                    )}
                                    name="confirmNewPassword"
                                />
                            </Box>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {t('Change_password')}
                            </Button>
                        </form>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default ChangePasswordPage;
