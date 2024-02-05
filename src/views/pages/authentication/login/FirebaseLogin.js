import React from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    makeStyles,
    OutlinedInput,
    Typography
} from '@material-ui/core';
import useScriptRef from '../../../../hooks/useScriptRef';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { baseURL } from '../../../../api/index';
import { NotificationManager } from "react-notifications";
import { Link as RouterLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
    root: {},
    redButton: {
        fontSize: '1rem',
        fontWeight: 500,
        backgroundColor: theme.palette.grey[50],
        border: '1px solid',
        borderColor: theme.palette.grey[100],
        color: theme.palette.grey[600],
        textTransform: 'none',
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.875rem'
        }
    },
    signDivider: {
        flexGrow: 1
    },
    signText: {
        cursor: 'unset',
        margin: theme.spacing(2),
        padding: '5px 56px',
        borderColor: theme.palette.grey[100] + ' !important',
        color: theme.palette.grey[900] + '!important',
        fontWeight: 500
    },
    margin: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1)
    },
    forgot: {
        textDecoration: 'none',
        color: theme.palette.purple.main
    },
    loginIcon: {
        marginRight: '16px',
        [theme.breakpoints.down('sm')]: {
            marginRight: '8px'
        }
    },
    title: {
        color: theme.palette.grey[600]
    },
    login: {
        backgroundColor: '#a41460',
        '&:hover': {
            backgroundColor: '#f770b5'
        }
    },
    loginput: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        '& > label': {
            top: '23px',
            left: 0,
            color: theme.palette.grey[500],
            '&[data-shrink="false"]': {
                top: '5px'
            }
        },
        '& > div > input': {
            padding: '30.5px 14px 11.5px !important'
        },
        '& legend': {
            display: 'none'
        },
        '& fieldset': {
            top: 0
        }
    },
    startAdornment: {
        color: theme.palette.grey[500],
        marginTop: '18px',
        width: 'auto'
    }
}));

const FirebaseLogin = (props, { className, ...rest }) => {
    const classes = useStyles();
    const customization = useSelector((state) => state.customization);
    const scriptedRef = useScriptRef();
    const [showPassword, setShowPassword] = React.useState(false);
    const [checked, setChecked] = React.useState(true);
    let history = useHistory();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    fetch(
        encodeURI(baseURL + '/panel-check-status'),
        {
            method: "GET",
        }
    )
        .then((response) => response.json())
        .then((data) => {

            if (JSON.stringify(data).includes("ok")) {

                // alert("HEEE")

            } else {

                history.push("/maintenance");
                toast.warninfoing('We are currently at Maintainance', {
                    type: 'info',
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

            }



        })
        .catch((err) => {
            // toast.error('Duplicate entry', {
            //     type: 'error',
            //     position: "top-right",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "colored",
            //   });


        });

    return (
        <React.Fragment>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    username: Yup.string().max(255).required('Mobile No is required'),
                    password: Yup.string().max(10).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (scriptedRef.current) {

                            let formData = new FormData();
                            formData.append('username', values.username);
                            formData.append('password', values.password);


                            fetch(
                                encodeURI(baseURL + '/panel-login'),
                                {
                                    method: "POST",
                                    body: formData
                                }
                            )
                                .then((response) => response.json())
                                .then((data) => {
                                    if (data.code == '404') {
                                        toast.error("Mobile No is not Registered", {
                                            type: 'error',
                                            position: "top-right",
                                            autoClose: 5000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: "colored",
                                        });
                                    } else if (data.code == '401') {
                                        toast.error("Mobile No is not Registered", {
                                            type: 'error',
                                            position: "top-right",
                                            autoClose: 5000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: "colored",
                                        });
                                    } else if (data.code == '402') {
                                        toast.error("User is Inactive", {
                                            type: 'error',
                                            position: "top-right",
                                            autoClose: 5000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: "colored",
                                        });
                                    } else if (data.code == '403') {
                                        toast.error("User is Unauthorised", {
                                            type: 'error',
                                            position: "top-right",
                                            autoClose: 5000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: "colored",
                                        });
                                    } else if (data.UserInfo.token) {
                                        localStorage.setItem("name", data.UserInfo.user.name);
                                        localStorage.setItem("admin_type", data.UserInfo.user.admin_type);
                                        localStorage.setItem("user_type", data.UserInfo.user.user_type);
                                        localStorage.setItem("details_view", data.UserInfo.user.details_view);
                                        localStorage.setItem("username", data.UserInfo.user.mobile);
                                        localStorage.setItem("userimage", data.UserInfo.user.image);
                                        localStorage.setItem("login", data.UserInfo.token);
                                        history.push("/dashboard");
                                        setStatus({ success: true });
                                        toast.success("Success", {
                                            type: 'Success',
                                            position: "top-right",
                                            autoClose: 5000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: "colored",
                                        });
                                        setSubmitting(false);
                                    }
                                })
                                .catch((err) => {
                                    NotificationManager.error("Mobile No or password incorrect");
                                    toast.error("Mobile No or password incorrect", {
                                        type: 'error',
                                        position: "top-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "colored",
                                    });
                                });


                        }
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                            toast.error('Duplicate entry', {
                                type: 'error',
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                            });
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} className={clsx(classes.root, className)} {...rest}>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.username && errors.username)}
                            className={classes.loginput}
                            variant="outlined"
                        >
                            <InputLabel htmlFor="outlined-adornment-email-login">Mobile No</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                value={values.username}
                                name="username"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    const numericValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
                                    handleChange({
                                        target: {
                                            name: 'username',
                                            value: numericValue.slice(0, 10), // Limit to 10 digits
                                        },
                                    });
                                }}
                                label='username'
                                type='tel'
                                inputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    },
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        {values.username.length}/{10} {/* Display current length / maximum length */}
                                    </InputAdornment>
                                }
                            />
                            {touched.username && errors.username && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {' '}
                                    {errors.username}{' '}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            className={classes.loginput}
                            variant="outlined"
                        >
                            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label='Password'
                                inputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {' '}
                                    {errors.password}{' '}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={(event) => setChecked(event.target.checked)}
                                            name="checked"
                                            color="primary"
                                        />
                                    }
                                    label={<React.Fragment>Keep me logged in</React.Fragment>}
                                />
                            </Grid>
                            <Grid item>
                                <Typography style={{ textDecoration: 'none', color: '#868688' }} component={RouterLink}
                                    variant="subtitle1" to="forget-password">
                                    Forgot Password?
                                </Typography>
                            </Grid>
                        </Grid>
                        {errors.submit && (
                            <Box mt={3}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box mt={2} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                                disableElevation
                                disabled={isSubmitting}
                                fullWidth
                                size="small "
                                type="submit"
                                variant="contained"
                                className={classes.login}
                                style={{ flex: 1, marginRight: '8px' }}
                            >
                                Sign in
                            </Button>
                            <Button
                                disableElevation
                                disabled={isSubmitting}
                                fullWidth
                                size="small"
                                type="button"
                                variant="contained"
                                className={classes.login}
                                style={{ flex: 1, color: '#fff' }}
                            >
                                <a href='https://businessboosters.club' style={{ listStyle: 'none', textDecoration: "none", display: 'flex', justifyContent: 'center', color: 'inherit' }}>Back </a>
                            </Button>


                        </Box>
                        <h4 style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', color: '#868688', fontWeight: '200' }}>Not a Member ! </h4>
                        <span>
                            <a href='https://businessboosters.club/register' style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                                Sign Up
                            </a>
                        </span>




                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="colored"
                        />
                    </form>
                )}
            </Formik>
        </React.Fragment>
    );
};

export default FirebaseLogin;
