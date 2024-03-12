'use client';

import { NextPage } from 'next';
import { Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import CustomTextField from 'src/components/text-field';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import IconifyIcon from 'src/components/Icon';
import Avatar from '@mui/material/Avatar';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import WrapperFileUpload from 'src/components/wrapper-file-upload';
import { useAuth } from 'src/hooks/useAuth';

type TProps = {};

type TDefaultValue = {
    email: string;
    address: string;
    city: string;
    phoneNumber: string;
    role: string;
    fullName: string;
};

const MyProfilePage: NextPage<TProps> = () => {
    const { user } = useAuth();
    const { t } = useTranslation();

    const defaultValue: TDefaultValue = {
        email: '',
        address: '',
        city: '',
        phoneNumber: '',
        role: '',
        fullName: '',
    };

    // Theme
    const theme = useTheme();

    const schema = yup.object().shape({
        email: yup
            .string()
            .email('The field must be in email type')
            .required('The field is required'),
        fullName: yup.string().required('This field is required'),
        address: yup.string().required('This field is required'),
        city: yup.string().required('This field is required'),
        phoneNumber: yup.string().required('This field is required'),
        role: yup.string().required('This field is required'),
    });

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: defaultValue,
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (user) {
            reset({
                email: '',
                address: '',
                city: '',
                phoneNumber: '',
                fullName: '',
                role: user?.role?.name,
            });
        }
    }, [user]);

    const onSubmit = (data: { email: string }) => {
        console.log('data', { data, errors });
    };

    const handleUploadAvatar = (file: File) => {};

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

                                        <IconifyIcon
                                            icon="ph:user-thin"
                                            fontSize={70}
                                        />
                                    </Avatar>

                                    <WrapperFileUpload
                                        uploadFunc={handleUploadAvatar}
                                        objectAcceptFile={{
                                            'image/jpeg': ['.jpg', '.jpeg'],
                                            'image/png': ['.png'],
                                        }}
                                    >
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                width: 'auto',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1,
                                            }}
                                        >
                                            <Icon icon="ant-design:camera-outlined" />
                                            {t('upload_avatar')}
                                        </Button>
                                    </WrapperFileUpload>
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
                                            disabled
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
                                            error={Boolean(errors?.role)} // error là props của TextFieldProps (MUI)
                                            helperText={errors?.role?.message}
                                        />
                                    )}
                                    name="role"
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
                                            label={t('full_name')}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder={t('enter_your_full_name')}
                                            error={Boolean(errors?.fullName)} // error là props của TextFieldProps (MUI)
                                            helperText={errors?.fullName?.message}
                                        />
                                    )}
                                    name="fullName"
                                />
                            </Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <CustomTextField
                                            fullWidth
                                            label={t('Address')}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder={t('enter_your_address')}
                                            error={Boolean(errors?.address)} // error là props của TextFieldProps (MUI)
                                            helperText={errors?.address?.message}
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
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <CustomTextField
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
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <CustomTextField
                                            fullWidth
                                            label={t('Phone_number')}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder={t('enter_your_phone')}
                                            error={Boolean(errors?.phoneNumber)} // error là props của TextFieldProps (MUI)
                                            helperText={errors?.phoneNumber?.message}
                                        />
                                    )}
                                    name="phoneNumber"
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
                    {t('Update')}
                </Button>
            </Box>
        </form>
    );
};

export default MyProfilePage;
