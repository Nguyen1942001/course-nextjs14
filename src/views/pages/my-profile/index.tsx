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
import Avatar from '@mui/material/Avatar';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import WrapperFileUpload from 'src/components/wrapper-file-upload';
import { getAuthMe } from 'src/service/auth';
import { UserDataType } from 'src/contexts/types';
import { convertBase64, separationFullName, toFullName } from 'src/utils';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/stores';
import toast from 'react-hot-toast';
import { resetInitialState } from 'src/stores/apps/auth';
import { updateAuthMeAsync } from 'src/stores/apps/auth/action';
import FallbackSpinner from 'src/components/fall-back';

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
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<UserDataType | null>(null);
    const [avatar, setAvatar] = useState('');
    const [roleId, setRoleId] = useState('');

    const { t, i18n } = useTranslation();

    // redux
    const dispatch: AppDispatch = useDispatch();
    const { isLoading, isErrorUpdateMe, messageUpdateMe, isSuccessUpdateMe } = useSelector(
        (state: RootState) => state.auth
    );

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
        fullName: yup.string().notRequired(),
        phoneNumber: yup
            .string()
            .required('This field is required')
            .min(8, 'The phone number is min 8 numbers'),
        role: yup.string().required('This field is required'),
        city: yup.string().notRequired(),
        address: yup.string().notRequired(),
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

    const fetchGetAuthMe = async () => {
        await getAuthMe()
            .then(async (response) => {
                setLoading(false);
                const data = response?.data;
                if (data) {
                    setRoleId(data?.role?._id);
                    setAvatar(data?.avatar);

                    reset({
                        email: data?.email,
                        address: data?.address,
                        city: data?.city,
                        phoneNumber: data?.phoneNumber,
                        role: data?.role?.name,
                        fullName: toFullName(
                            data?.lastName,
                            data?.middleName,
                            data?.firstName,
                            i18n.language
                        ),
                    });
                }

                // setUser({ ...response.data });
            })
            .catch(() => {
                setUser(null);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchGetAuthMe();
    }, [i18n.language]);

    useEffect(() => {
        if (messageUpdateMe) {
            if (isErrorUpdateMe) {
                toast.error(messageUpdateMe);
            } else if (isSuccessUpdateMe) {
                toast.success(messageUpdateMe);

                // Call api again for getting new info after updating
                fetchGetAuthMe();
            }

            dispatch(resetInitialState());
        }
    }, [isErrorUpdateMe, isSuccessUpdateMe, messageUpdateMe]);

    const onSubmit = (data: any) => {
        // Phân tách chuỗi fullname thành lastName, middleName, firstName
        const { firstName, middleName, lastName } = separationFullName(
            data.fullName,
            i18n.language
        );

        dispatch(
            updateAuthMeAsync({
                email: data.email,
                firstName: firstName,
                lastName: lastName,
                middleName: middleName,
                role: roleId,
                phoneNumber: data.phoneNumber,
                avatar: avatar,
                address: data.address,
            })
        );
    };

    const handleUploadAvatar = async (file: File) => {
        const base64 = await convertBase64(file);
        setAvatar(base64 as string);
    };

    return (
        <>
            {loading || (isLoading && <FallbackSpinner />)}

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
                                        <Box
                                            sx={{
                                                position: 'relative',
                                            }}
                                        >
                                            {/*  Icon xóa avatar  */}
                                            {avatar && (
                                                <IconButton
                                                    edge="start"
                                                    color="inherit"
                                                    aria-label="open drawer"
                                                    sx={{
                                                        position: 'absolute',
                                                        bottom: -4,
                                                        right: -6,
                                                        zIndex: 2,
                                                        color: theme.palette.error.main,
                                                    }}
                                                    onClick={() => setAvatar('')}
                                                >
                                                    <Icon icon="material-symbols-light:delete-outline" />
                                                </IconButton>
                                            )}

                                            {avatar ? (
                                                <Avatar
                                                    src={avatar}
                                                    sx={{ width: 100, height: 100 }}
                                                >
                                                    <Icon
                                                        icon="ph:user-thin"
                                                        fontSize={70}
                                                    />
                                                </Avatar>
                                            ) : (
                                                <Avatar sx={{ width: 100, height: 100 }}>
                                                    <Icon
                                                        icon="ph:user-thin"
                                                        fontSize={70}
                                                    />
                                                </Avatar>
                                            )}
                                        </Box>

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
                                                {avatar ? t('change_avatar') : t('upload_avatar')}
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
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <CustomTextField
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
                                        name="address"
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <CustomTextField
                                                fullWidth
                                                label={t('Address')}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                placeholder={t('enter_your_address')}
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <Controller
                                        name="city"
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <CustomTextField
                                                fullWidth
                                                label={t('City')}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                placeholder={t('enter_your_city')}
                                            />
                                        )}
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
                                                onChange={(e) => {
                                                    const numValue = e.target.value.replace(
                                                        /\D/g,
                                                        ''
                                                    );
                                                    onChange(numValue);
                                                }}
                                                inputProps={{
                                                    inputMode: 'numeric',
                                                    pattern: '[0-9]*',
                                                    minLength: 8,
                                                }}
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
        </>
    );
};

export default MyProfilePage;
