'use client';

import { NextPage } from 'next';
import Link from 'next/link';
import { Button, Card, Grid, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomTextField from 'src/components/text-field';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PASSWORD_REG } from 'src/configs/regex';
import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import IconifyIcon from 'src/components/Icon';
import Avatar from '@mui/material/Avatar';

type TProps = {};
type TDefaultValue = {
    email: string;
    password: string;
    confirmPassword: string;
};

const MyProfilePage: NextPage<TProps> = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
            <Card
                sx={{
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: '15px',
                    p: 4,
                }}
            >
                <Grid
                    container
                    spacing={5}
                >
                    {/*   Left  */}
                    <Grid
                        item
                        container
                        md={6}
                        xs={12}
                        spacing={5}
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
                                        placeholder="Input email"
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

                    {/*   Right  */}
                    <Grid
                        item
                        container
                        md={6}
                        xs={12}
                        spacing={5}
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
                </Grid>
            </Card>

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
