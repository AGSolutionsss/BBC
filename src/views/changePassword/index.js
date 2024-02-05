import React, { useEffect, useState } from "react";
import { Grid, makeStyles, FormControl, InputLabel, OutlinedInput, Box, Button, Card, CardHeader, Typography, Divider, CardContent } from '@material-ui/core';
import {baseURL} from "../../api/index";
import {gridSpacing} from '../../store/constant';
import { NotificationManager } from "react-notifications";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
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
    login: {
        backgroundColor: theme.palette.purple.main,
        '&:hover': {
            backgroundColor: theme.palette.purple.dark
        }
    },
    login2: {
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark
        }
    },
}));


const ChangePassword = () => {
    const classes = useStyles();
    let history = useHistory();

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("login");
        if(!isLoggedIn){

            window.location = "/login";
        
        }else{
            
        }
    }, []);

    const [changePassword, setChangePassword] = useState({
        old_password: "",
        password: "",
        confirm_password: ""
    });

    const onSubmit = (e) => {
        e.preventDefault();

        if (changePassword.password !== changePassword.confirm_password) {
            
            toast.error("Passwords don't match", {
                type: 'error',
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return false;
        }

        if (changePassword.password == changePassword.old_password) {
            
            toast.error("New Password & Old Password can not be same", {
                type: 'error',
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return false;
        }

        let data = {
            username: localStorage.getItem("username"),
            old_password: changePassword.old_password,
            password: changePassword.password,
        
        };

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        

        if (v) {
        
        axios({
            url: baseURL+"/panel-change-password",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                toast.success("Password Updated Successfully", {
                    type: 'Success',
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }else{
                toast.error("Password  not Updated Successfully", {
                    type: 'error',
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
            
        });
        }
    };

    const onInputChange = (e) => {
        setChangePassword({
            ...changePassword,
            [e.target.name]: e.target.value,
        });
    }
       
    return (
        <>
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
                theme="dark"
            />
            <Grid container>
                <Grid item xs={12}>
                    <Card >
                        <CardHeader title={<Typography variant="h5">Change Password</Typography>} />
                        <Divider />
                        <CardContent>
                            <form id="addIndiv" autoComplete="off">
                                <Grid item xs={12}>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <FormControl
                                                fullWidth
                                                className={classes.loginput}
                                                variant="outlined"
                                            >
                                                <InputLabel htmlFor="outlined-adornment-email-login">Old Password</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-email-login"
                                                    required
                                                    type="password"
                                                    name="old_password"
                                                    onChange={(e) => onInputChange(e)}
                                                    value={changePassword.old_password}
                                                    label='old_password'
                                                    inputProps={{
                                                        classes: {
                                                            notchedOutline: classes.notchedOutline
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <FormControl
                                                fullWidth
                                                className={classes.loginput}
                                                variant="outlined"
                                            >
                                                <InputLabel htmlFor="outlined-adornment-email-login">New Password</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-email-login"
                                                    required
                                                    type="password"
                                                    name="password"
                                                    onChange={(e) => onInputChange(e)}
                                                    value={changePassword.password}
                                                    label='password'
                                                    inputProps={{
                                                        classes: {
                                                            notchedOutline: classes.notchedOutline
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <FormControl
                                                fullWidth
                                                className={classes.loginput}
                                                variant="outlined"
                                            >
                                                <InputLabel htmlFor="outlined-adornment-email-login">Confirm Password</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-email-login"
                                                    required
                                                    type="password"
                                                    name="confirm_password"
                                                    onChange={(e) => onInputChange(e)}
                                                    value={changePassword.confirm_password}
                                                    label='confirm_password'
                                                    inputProps={{
                                                        classes: {
                                                            notchedOutline: classes.notchedOutline
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Box mt={2}>
                                    <Grid item xs={12}>
                                        <Grid container spacing={gridSpacing}>
                                            <Grid item lg={2} md={6} sm={6} xs={12}>
                                                <Button
                                                    fullWidth
                                                    size="large"
                                                    type="submit"
                                                    variant="contained"
                                                    className={classes.login}
                                                    onClick={(e) => onSubmit(e)}
                                                >
                                                Update
                                                </Button>
                                            </Grid>
                                            <Grid item lg={2} md={6} sm={6} xs={12}>
                                                <Link to="dashboard">
                                                    <Button
                                                        fullWidth
                                                        size="large"
                                                        type="buton"
                                                        variant="contained"
                                                        className={classes.login2}
                                                    >
                                                    Cancel
                                                    </Button>
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default ChangePassword;
