import React, { useEffect, useState } from "react";
import { Grid, makeStyles, FormControl, InputLabel, OutlinedInput, Box, Button, Card, CardContent,TextField } from '@material-ui/core';
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



const UserSlider = () => {
    const classes = useStyles();
    let history = useHistory();
    const [slider, setSlider] = useState({
        product_image1: "",
        product_image2: "",
        product_image3: "",
        product_image4: "",
        product_image5: "",
    });

    const [check,setCheck] = useState(false);
    const [ids, setids] = useState("");
    const [selectedFile1, setSelectedFile1] = React.useState(null);
    const [selectedFile2, setSelectedFile2] = React.useState(null);
    const [selectedFile3, setSelectedFile3] = React.useState(null);
    const [selectedFile4, setSelectedFile4] = React.useState(null);
    const [selectedFile5, setSelectedFile5] = React.useState(null);

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("login");
        if(!isLoggedIn){

            window.location = "/login";
        
        }else{

            axios({
                url: baseURL+"/panel-fetch-slider",
                method: "GET",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("login")}`,
                },
              }).then((res) => {
                
                if(res.data.slider === undefined || res.data.slider === null){
                    setCheck(true);
                }else{
                    setids(res.data.slider.id);
                    setCheck(false);
                    setSlider(res.data.slider);
                }
                
                
            });

        }
    }, []);

    const onSubmit = (e) => {
        const data = new FormData();
        data.append("product_image1",selectedFile1);
        data.append("product_image2",selectedFile2);
        data.append("product_image3",selectedFile3);
        data.append("product_image4",selectedFile4);
        data.append("product_image5",selectedFile5);

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        
        axios({
            url: baseURL+"/panel-create-slider",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                toast.success("Data Created Successfully", {
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
                toast.error("Data not Created Successfully", {
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
    }

    const onUpdate = (e) => {

        const data = new FormData();
        data.append("product_image1",selectedFile1);
        data.append("product_image2",selectedFile2);
        data.append("product_image3",selectedFile3);
        data.append("product_image4",selectedFile4);
        data.append("product_image5",selectedFile5);

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        
        axios({
            url: baseURL+"/panel-update-slider/"+ids+'?_method=PUT',
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                toast.success("Data updated Successfully", {
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
                toast.error("Data  not updated", {
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
                        <CardContent>
                            <form id="addIndiv" autoComplete="off">
                                <Grid item xs={12}>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="product_image1"
                                                type="file"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                onChange={(e) => setSelectedFile1(e.target.files[0])}
                                                accept="image/*"
                                                label='Portfolio 1'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="product_image2"
                                                type="file"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                onChange={(e) => setSelectedFile2(e.target.files[0])}
                                                accept="image/*"
                                                label='Portfolio 2'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="product_image3"
                                                type="file"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                onChange={(e) => setSelectedFile3(e.target.files[0])}
                                                accept="image/*"
                                                label='Portfolio 3'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12} style={{textAlign:'center'}}>
                                            {slider.product_image1 === null || slider.product_image1 === '' ? <img src="https://businessboostersclub.online/public/images/product_images/no_image.jpg" style={{width:'260px',height:'150px'}}/> : <img src={"https://businessboostersclub.online/public/images/product_images/"+slider.product_image1} style={{width:'260px',height:'150px'}}/>}
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12} style={{textAlign:'center'}}>
                                            {slider.product_image2 === null || slider.product_image2 === '' ? <img src="https://businessboostersclub.online/public/images/product_images/no_image.jpg" style={{width:'260px',height:'150px'}}/> : <img src={"https://businessboostersclub.online/public/images/product_images/"+slider.product_image2} style={{width:'260px',height:'150px'}}/>}
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12} style={{textAlign:'center'}}>
                                            {slider.product_image3 === null || slider.product_image3 === '' ? <img src="https://businessboostersclub.online/public/images/product_images/no_image.jpg" style={{width:'260px',height:'150px'}}/> : <img src={"https://businessboostersclub.online/public/images/product_images/"+slider.product_image3} style={{width:'260px',height:'150px'}}/>}
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="product_image4"
                                                type="file"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                onChange={(e) => setSelectedFile4(e.target.files[0])}
                                                accept="image/*"
                                                label='Portfolio 4'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="product_image5"
                                                type="file"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                onChange={(e) => setSelectedFile5(e.target.files[0])}
                                                accept="image/*"
                                                label='Portfolio 5'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={gridSpacing} style={{textAlign:'center'}}>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            {slider.product_image4 === null || slider.product_image4 === '' ? <img src="https://businessboostersclub.online/public/images/product_images/no_image.jpg" style={{width:'260px',height:'150px'}}/> : <img src={"https://businessboostersclub.online/public/images/product_images/"+slider.product_image4} style={{width:'260px',height:'150px'}}/>}
                                         </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12} style={{textAlign:'center'}}>
                                            {slider.product_image5 === null || slider.product_image5 === '' ? <img src="https://businessboostersclub.online/public/images/product_images/no_image.jpg" style={{width:'260px',height:'150px'}}/> : <img src={"https://businessboostersclub.online/public/images/product_images/"+slider.product_image5} style={{width:'260px',height:'150px'}}/>}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Box mt={2}>
                                    <Grid item xs={12}>
                                        <Grid container spacing={gridSpacing}>
                                            {check == false && (
                                            <Grid item lg={2} md={6} sm={6} xs={12}>
                                                <Button
                                                    fullWidth
                                                    size="large"
                                                    type="submit"
                                                    variant="contained"
                                                    className={classes.login}
                                                    onClick={(e) => onUpdate(e)}
                                                >
                                                Update
                                                </Button>
                                            </Grid>
                                            )}
                                            {check == true && (
                                                <Grid item lg={2} md={6} sm={6} xs={12}>
                                                    <Button
                                                        fullWidth
                                                        size="large"
                                                        type="submit"
                                                        variant="contained"
                                                        className={classes.login}
                                                        onClick={(e) => onSubmit(e)}
                                                    >
                                                    Submit
                                                    </Button>
                                                </Grid>
                                            )}
                                            
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

export default UserSlider;
