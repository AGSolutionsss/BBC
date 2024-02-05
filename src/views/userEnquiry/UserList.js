import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import {baseURL} from "../../api/index";


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

const UserEnquiry = () => {
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


        fetch(baseURL+'/panel-fetch-enquiry', requestOptions)
        .then(response => response.json())
        .then(data => {
            let res = data.enquiry;
            let tempRows = [];
            for (let i = 0; i < res.length; i++) {
          
                tempRows.push([
                    i+1,
                    res[i]["contact_name"],
                    res[i]["contact_email"],
                    res[i]["contact_mobile"],
                    res[i]["contact_message"],
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
        "Email",
        "Mobile",
        "Message",
    ]
       
    return (
        <>
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

export default UserEnquiry;
