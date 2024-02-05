import React, { useEffect, useState } from "react";
import { Grid, makeStyles,  Box, Button, Card, TextField,MenuItem, CardContent } from '@material-ui/core';
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

const label = {
    color: "black",
};

const span = {
    color: "black",
    fontWeigt: 600,
};

const grid = {
    border:"2px solid lightgray",
    padding: "10px",
}

const p_type = [
{
    value: "BBC Main",
    label: "BBC Main",
},
{
    value: "BBC UDAYAN",
    label: "BBC UDAYAN",
},
{
    value: "All",
    label: "All",
},

];

const UpdateNewProfile = () => {
    const classes = useStyles();
    let history = useHistory();
    var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  
  var todayback = "2008-" + mm + "-" + dd;
    var d = document.getElementById("dob");
    if (d) {
        document.getElementById("dob").setAttribute("max", todayback);
        document.getElementById("spouse_dob").setAttribute("max", todayback);
    }
    const [UpdateNewProfile, setUpdateNewProfiles] = useState({
        p_type: "",
    });
    var url = new URL(window.location.href);
  var id = url.searchParams.get("id");
    useEffect(() => {
        var isLoggedIn = localStorage.getItem("login");
        if(!isLoggedIn){

            window.location = "/login";
        
        }else{
            axios({
                url: baseURL+"/panel-fetch-profile-by-id/"+id,
                method: "GET",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("login")}`,
                },
              }).then((res) => {
                
                setUpdateNewProfiles(res.data.new_user);
                
              });
        }
    }, []);

    const onSubmit = (e) => {

        const data = new FormData();
        data.append("p_type",UpdateNewProfile.p_type);
        

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        
        axios({
            url: baseURL+"/panel-update-new-profile/"+UpdateNewProfile.id+'?_method=PUT',
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                
                toast.success("Profile  updated Successfully", {
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
                toast.error("Data is not updated", {
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
        
        setUpdateNewProfiles({
            ...UpdateNewProfile,
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
            theme="colored"
        />
            <Grid container>
                <Grid item xs={12}>
                    <Card >
                        
                        <CardContent>
                            <form id="addIndiv" autoComplete="off">
                                <Grid item xs={12}>
                                    <Grid container spacing={gridSpacing} style={{marginTop:'-10px'}}>
                                        <Grid item lg={3} md={6} sm={6} xs={12} style={grid}>
                                            <label style={label}>Full Name : </label> 
                                            <span style={span}>{UpdateNewProfile.name}</span>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12} style={grid}>
                                            <label style={label}>Gender : </label> 
                                            <span style={span}>{UpdateNewProfile.gender}</span>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12} style={grid}>
                                            <label style={label}>DOB : </label> 
                                            <span style={span}>{UpdateNewProfile.dob}</span>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12} style={grid}>
                                            {UpdateNewProfile.image === null ? <img src="https://businessboosters.club/public/images/user_images/no_images.png" style={{width:'45px',height:'45px'}}/> : <img src={"https://businessboosters.club/public/images/user_images/"+UpdateNewProfile.image} style={{width:'45px',height:'45px'}}/>}
                                        </Grid>
                                    
                                        <Grid item lg={6} md={6} sm={6} xs={12} style={grid}>
                                            <label style={label}>Email : </label> 
                                            <span style={span}>{UpdateNewProfile.email}</span>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12} style={grid}>
                                            <label style={label}>Mobile : </label> 
                                            <span style={span}>{UpdateNewProfile.mobile}</span>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12} style={grid}>
                                            <label style={label}>Whats App : </label> 
                                            <span style={span}>{UpdateNewProfile.whatsapp_number}</span>
                                        </Grid>
                                    
                                        <Grid item lg={4} md={6} sm={6} xs={12} style={grid}>
                                            <label style={label}>Spouse Name : </label> 
                                            <span style={span}>{UpdateNewProfile.spouse_name}</span>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12} style={grid}>
                                            <label style={label}>Date of Anniversary : </label> 
                                            <span style={span}>{UpdateNewProfile.doa}</span>
                                            
                                        </Grid>
                                    
                                        <Grid item lg={4} md={6} sm={6} xs={12} style={grid}>
                                            <label style={label}>Name of the Company : </label> 
                                            <span style={span}>{UpdateNewProfile.company}</span>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12} style={grid}>
                                            <label style={label}>Company Short Name : </label> 
                                            <span style={span}>{UpdateNewProfile.company_short}</span>
                                            
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12} style={grid}>
                                            <label style={label}>Business Category : </label> 
                                            <span style={span}>{UpdateNewProfile.category}</span>
                                            
                                        </Grid>

                                        <Grid item lg={4} md={6} sm={6} xs={12} style={grid}>
                                            <label style={label}>Website : </label> 
                                            <span style={span}>{UpdateNewProfile.website}</span>
                                            
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12} style={grid}>
                                            <label style={label}>Experience : </label> 
                                            <span style={span}>{UpdateNewProfile.experience}</span>
                                            
                                        </Grid>
                                        
                                        <Grid item lg={4} md={6} sm={6} xs={12} style={grid}>
                                            <label style={label}>Landline Number : </label> 
                                            <span style={span}>{UpdateNewProfile.landline}</span>
                                            
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12} style={grid}>
                                            <label style={label}>Area : </label> 
                                            <span style={span}>{UpdateNewProfile.area}</span>
                                        </Grid>
                                        <Grid item lg={12} md={6} sm={6} xs={12} style={grid}>
                                            <label style={label}>Address : </label> 
                                            <span style={span}>{UpdateNewProfile.address}</span>
                                            
                                        </Grid>
                                    
                                        <Grid item lg={12} md={12} sm={12} xs={12} style={grid}>
                                            <label style={label}>Products / Services : </label> 
                                            <span style={span}>{UpdateNewProfile.product}</span>
                                            
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12} style={grid}>
                                            <label style={label}>Product Tag : </label> 
                                            <span style={span}>{UpdateNewProfile.profile_tag}</span>
                                            
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12}>
                                            <TextField
                                                name="p_type"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={UpdateNewProfile.p_type}
                                                label='Group'
                                                className={classes.notchedOutline}
                                                fullWidth
                                                SelectProps={{
                                                    MenuProps: {},
                                                  }}
                                                  select
                                            >
                                                {p_type.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                                </MenuItem>
                                            ))}
                                            </TextField>
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
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default UpdateNewProfile;
