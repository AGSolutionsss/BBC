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

const gender = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
    
  ];


const UserProfile = () => {
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
    const [userProfile, setUserProfiles] = useState({
        id: "",
        name: "",
        category: "",
        company: "",
        company_short: "",
        experience: "",
        address: "",
        area: "",
        landline: "",
        working_hours: "",
        mobile: "",
        whatsapp_number: "",
        website: "",
        dob: "",
        gender: "",
        spouse_name: "",
        spouse_dob: "",
        product: "",
        doa: "",
        image: "",
        profile_tag: "",
    });
    
    useEffect(() => {
        var isLoggedIn = localStorage.getItem("login");
        if(!isLoggedIn){

            window.location = "/login";
        
        }else{
            axios({
                url: baseURL+"/panel-fetch-profile",
                method: "GET",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("login")}`,
                },
              }).then((res) => {
                
                setUserProfiles(res.data.profile);
                
              });
        }
    }, []);

    const [selectedFile, setSelectedFile] = React.useState(null);

    const onSubmit = (e) => {

        const data = new FormData();
        data.append("name",userProfile.name);
        data.append("category",userProfile.category);
        data.append("company",userProfile.company);
        data.append("company_short",userProfile.company_short);
        data.append("experience",userProfile.experience);
        data.append("address",userProfile.address);
        data.append("area",userProfile.area);
        data.append("landline",userProfile.landline);
        data.append("working_hours",userProfile.working_hours);
        data.append("mobile",userProfile.mobile);
        data.append("whatsapp_number",userProfile.whatsapp_number);
        data.append("website",userProfile.website);
        data.append("dob",userProfile.dob);
        data.append("gender",userProfile.gender);
        data.append("spouse_name",userProfile.spouse_name);
        data.append("spouse_dob",userProfile.spouse_dob);
        data.append("product",userProfile.product);
        data.append("expertise",userProfile.expertise);
        data.append("profile_tag",userProfile.profile_tag);
        data.append("image",selectedFile);

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        
        axios({
            url: baseURL+"/panel-update-profile/"+userProfile.id+'?_method=PUT',
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

    const validateOnlyDigits = (inputtxt) => {
        var phoneno = /^\d+$/;
        if(inputtxt.match(phoneno) || inputtxt.length==0){
           return true;
         }else{
           return false;
         }
    }

    const validateOnlyText = (inputtxt) => {

        var re = /^[A-Za-z ]+$/;
        if(inputtxt === "" || re.test(inputtxt)){
          return true;
        }else{
          return false;
        }
    }

    const onInputChange = (e) => {
        if(e.target.name=="mobile"){
            if(validateOnlyDigits(e.target.value)){
                setUserProfiles({
                    ...userProfile,
                    [e.target.name]: e.target.value,
                });
            }
        }else if(e.target.name=="name"){
    
            if(validateOnlyText(e.target.value)){
                setUserProfiles({
                ...userProfile,
                [e.target.name]: e.target.value,
                });
            }
           
        }else if(e.target.name=="category"){
    
            if(validateOnlyText(e.target.value)){
                setUserProfiles({
                ...userProfile,
                [e.target.name]: e.target.value,
                });
            }
           
        }else if(e.target.name=="spouse_name"){
    
            if(validateOnlyText(e.target.value)){
                setUserProfiles({
                ...userProfile,
                [e.target.name]: e.target.value,
                });
            }
           
        }else if(e.target.name=="experience"){
    
            if(validateOnlyDigits(e.target.value)){
                setUserProfiles({
                    ...userProfile,
                    [e.target.name]: e.target.value,
                });
            }
           
        }else if(e.target.name=="landline"){
            if(validateOnlyDigits(e.target.value)){
                setUserProfiles({
                    ...userProfile,
                    [e.target.name]: e.target.value,
                });
            }
        }else if(e.target.name=="whatsapp_number"){
            if(validateOnlyDigits(e.target.value)){
                setUserProfiles({
                    ...userProfile,
                    [e.target.name]: e.target.value,
                });
            }
        }else{
            setUserProfiles({
                ...userProfile,
                [e.target.name]: e.target.value,
            });
        }
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
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="name"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={userProfile.name}
                                                label='Full Name'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="gender"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={userProfile.gender}
                                                label='Gender'
                                                SelectProps={{
                                                    MenuProps: {},
                                                }}
                                                select
                                                className={classes.notchedOutline}
                                                fullWidth
                                            >
                                            {gender.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                                </MenuItem>
                                            ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="dob"
                                                required
                                                type="date"
                                                onChange={(e) => onInputChange(e)}
                                                value={userProfile.dob}
                                                label='DOB'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={2} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="image"
                                                type="file"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                onChange={(e) => setSelectedFile(e.target.files[0])}
                                                accept="image/*"
                                                label='Profile Image'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={1} md={6} sm={6} xs={12}>
                                            {userProfile.image === null ? <img src="https://businessboosters.club/public/images/user_images/no_images.png" style={{width:'45px',height:'45px'}}/> : <img src={"https://businessboosters.club/public/images/user_images/"+userProfile.image} style={{width:'45px',height:'45px'}}/>}
                                        </Grid>
                                    
                                        <Grid item lg={6} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="email"
                                                required
                                                type="email"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                onChange={(e) => onInputChange(e)}
                                                value={userProfile.email}
                                                label='Email'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="mobile"
                                                required
                                                inputProps={{ maxLength: 10, minLength:10 }}
                                                onChange={(e) => onInputChange(e)}
                                                value={userProfile.mobile}
                                                label='Mobile'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="whatsapp_number"
                                                required
                                                inputProps={{ maxLength: 10, minLength:10 }}
                                                onChange={(e) => onInputChange(e)}
                                                value={userProfile.whatsapp_number}
                                                label='Whats App'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                    
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="spouse_name"
                                                onChange={(e) => onInputChange(e)}
                                                value={userProfile.spouse_name}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                label='Spouse Name'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="doa"
                                                type="date"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                onChange={(e) => onInputChange(e)}
                                                value={userProfile.doa}
                                                label='Date of Anniversary'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                    
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="company"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={userProfile.company}
                                                label='Name of the Company'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="company_short"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={userProfile.company_short}
                                                label='Company Short Name'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="category"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={userProfile.category}
                                                label='Business Category'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>

                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="website"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                onChange={(e) => onInputChange(e)}
                                                value={userProfile.website}
                                                label='Website'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="experience"
                                                onChange={(e) => onInputChange(e)}
                                                value={userProfile.experience}
                                                label='Experience'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="landline"
                                                onChange={(e) => onInputChange(e)}
                                                value={userProfile.landline}
                                                label='Landline Number'
                                                inputProps={{ maxLength: 12, minLength:10 }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="area"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={userProfile.area}
                                                label='Area'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                            
                                        </Grid>
                                        <Grid item lg={12} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="address"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={userProfile.address}
                                                label='Address'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                    
                                        <Grid item lg={12} md={12} sm={12} xs={12}>
                                            <TextField
                                                name="product"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={userProfile.product}
                                                label='Products / Services'
                                                className={classes.notchedOutline}
                                                helperText="Type all Products or Servics separated by comma"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12}>
                                            <TextField
                                                name="profile_tag"
                                                onChange={(e) => onInputChange(e)}
                                                value={userProfile.profile_tag}
                                                label='Product Tag'
                                                className={classes.notchedOutline}
                                                helperText="Type all Products or Servics related Tags Separate by comma ( like CCTV Can be - Security System, Camera, Surveillance etc )"
                                                fullWidth
                                            />
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

export default UserProfile;
