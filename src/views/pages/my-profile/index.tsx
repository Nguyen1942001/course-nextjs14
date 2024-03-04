'use client';

import { NextPage } from 'next';
import { Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import CustomTextField from 'src/components/text-field';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PASSWORD_REG } from 'src/configs/regex';
import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import IconifyIcon from 'src/components/Icon';
import Avatar from '@mui/material/Avatar';
import { useTranslation } from 'react-i18next';

type TProps = {};
type TDefaultValue = {
    email: string;
    password: string;
    confirmPassword: string;
};

// 12p45s
const MyProfilePage: NextPage<TProps> = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { t } = useTranslation();

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
        console.log('data', { data, errors });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            autoComplete="off"
        >
            <Grid container>
                {/*   Left  */}
                <Grid
                    item
                    container
                    md={6}
                    xs={12}
                    sx={{
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: '15px',
                        py: 5,
                        px: 4,
                    }}
                >
                    <Box
                        sx={{
                            height: '100%',
                            width: '100%',
                        }}
                    >
                        <Grid
                            container
                            spacing={4}
                        >
                            <Grid
                                item
                                md={12}
                                xs={12}
                            >
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'column',
                                        gap: 2,
                                    }}
                                >
                                    <Avatar sx={{ width: 100, height: 100 }}>
                                        {/*{user?.avatar ? (*/}
                                        {/*    <Image*/}
                                        {/*        src={user?.avatar || ''}*/}
                                        {/*        alt="avatar"*/}
                                        {/*        style={{*/}
                                        {/*            height: 'auto',*/}
                                        {/*            width: 'auto',*/}
                                        {/*        }}*/}
                                        {/*    />*/}
                                        {/*) : (*/}
                                        {/*    <IconifyIcon icon="ph:user-thin" />*/}
                                        {/*)}*/}

                                        <IconifyIcon icon="ph:user-thin" />
                                    </Avatar>

                                    <Button
                                        variant="outlined"
                                        sx={{ width: 'auto' }}
                                    >
                                        Tải lên
                                    </Button>
                                </Box>
                            </Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
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
                                            placeholder={t('enter_your_email')}
                                            error={Boolean(errors?.email)} // error là props của TextFieldProps (MUI)
                                            helperText={errors?.email?.message}
                                        />
                                    )}
                                    name="email"
                                />
                            </Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <CustomTextField
                                            required
                                            fullWidth
                                            disabled
                                            label={t('Role')}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder={t('enter_your_role')}
                                            error={Boolean(errors?.email)} // error là props của TextFieldProps (MUI)
                                            helperText={errors?.email?.message}
                                        />
                                    )}
                                    name="email"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>

                {/*   Right  */}
                <Grid
                    item
                    container
                    md={6}
                    xs={12}
                    mt={{ md: 0, xs: 5 }}
                >
                    <Box
                        sx={{
                            height: '100%',
                            width: '100%',
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: '15px',
                            py: 5,
                            px: 4,
                        }}
                        marginLeft={{ md: 5, xs: 0 }}
                    >
                        <Grid
                            container
                            spacing={4}
                        >
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <CustomTextField
                                            required
                                            fullWidth
                                            label={t('Address')}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder={t('enter_your_address')}
                                            error={Boolean(errors?.email)} // error là props của TextFieldProps (MUI)
                                            helperText={errors?.email?.message}
                                        />
                                    )}
                                    name="address"
                                />
                            </Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <CustomTextField
                                            required
                                            fullWidth
                                            label={t('City')}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder={t('enter_your_city')}
                                            error={Boolean(errors?.city)} // error là props của TextFieldProps (MUI)
                                            helperText={errors?.city?.message}
                                        />
                                    )}
                                    name="city"
                                />
                            </Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <CustomTextField
                                            required
                                            fullWidth
                                            label={t('Phone_number')}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder={t('enter_your_phone_number')}
                                            error={Boolean(errors?.phoneNumber)} // error là props của TextFieldProps (MUI)
                                            helperText={errors?.phoneNumber?.message}
                                        />
                                    )}
                                    name="phoneNumber"
                                />
                            </Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
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
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>

            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                }}
            >
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Thay đổi
                </Button>
            </Box>
        </form>
    );
};

export default MyProfilePage;
