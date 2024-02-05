import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import {baseURL} from "../../api/index";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
    active: {
        backgroundColor: theme.palette.purple.main,
        '&:hover': {
            backgroundColor: theme.palette.purple.dark
        }
    },
    inactive: {
        backgroundColor: "green",
        '&:hover': {
            backgroundColor: "darkgreen"
        }
    },
}));

const UserInactiveList = () => {
    const classes = useStyles();
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("login");
        if(!isLoggedIn){

            window.location = "/login";
        
        }else{

        }

        var theLoginToken = localStorage.getItem('login');       
            
        const requestOptions = {
                method: 'GET', 
                headers: {
                'Authorization': 'Bearer '+theLoginToken
                }             
        };     


        fetch(baseURL+'/panel-fetch-inactive-profile', requestOptions)
        .then(response => response.json())
        .then(data => {
            let res = data.inactive;
            let tempRows = [];
            for (let i = 0; i < res.length; i++) {
          
                tempRows.push([
                    i+1,
                    res[i]["name"],
                    res[i]["company"],
                    res[i]["mobile"],
                    res[i]["area"],
                    res[i]["id"],
                ]);
              
            }
            setUserList(tempRows)
        }); 
    }, []);

    const option = {
        filterType: "dropDown",
        selectableRows: false,
        viewColumns : false,
    }

    const onUpdate = (value) =>{
        axios({
            url: baseURL+"/panel-update-inactive-profile/"+value,
            method: "PUT",
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                
                toast.success("Data  updated Successfully", {
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
                let resp = res.data.inactive;
                let tempRows = [];
                for (let i = 0; i < resp.length; i++) {
            
                    tempRows.push([
                        i+1,
                        resp[i]["name"],
                        resp[i]["company"],
                        resp[i]["mobile"],
                        resp[i]["area"],
                        resp[i]["id"],
                    ]);
                
                }
                setUserList(tempRows);
                
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

    const columnData = [
        {
            name: "#",
            options: {
              filter: false,
              print:false,
              download:false,
            }
        },
        "Full Name",
        "Company",
        "Mobile",
        "Area",
        {
            name:"Action",
            options:{
                filter: false,
                print:false,
                download:false,
                customBodyRender: (value) => {
                    
                    return(
                        <div>
                            <Tooltip title="To Active" placement="top">
                                <IconButton aria-label="To Active">
                                    <EditIcon onClick={(e) => onUpdate(value)}/>
                                </IconButton>
                            </Tooltip>
                        </div>
                    );
                },
            },
        },
    ]
       
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
                {userList.length > 0 && (
                    <MUIDataTable
                    data={userList}
                    columns={columnData}
                    options={option}
                  
                    />
                )}
                {userList.length <= 0 && (
                    <MUIDataTable
                    columns={columnData}
                    options={option}
                    />
                )}
            </Grid>
        </Grid>
    </>
    );
};

export default UserInactiveList;
