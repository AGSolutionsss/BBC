import React, { useEffect, useState } from "react";
import {Grid} from '@material-ui/core';
import {gridSpacing} from '../../store/constant';
import EarningCard from '../../ui-component/cards/EarningCard';
import TotalChartCard from '../../ui-component/cards/TotalChartCard';
import {baseURL} from "../../api/index";

const Dashboard = () => {

    const [total_active, settotalactive] = useState("");
    const [total_inactive, settotalinactive] = useState("");
    
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
        fetch(baseURL+'/panel-dashboard', requestOptions)
        .then(response => response.json())
        .then(data => {
            settotalactive(data.total_active);
            settotalinactive(data.total_inactive);
            
        }); 
    }, []);


    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard total_active={total_active}/>
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalChartCard total_inactive={total_inactive}/>
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} sm={12} md={8}>
                        
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
