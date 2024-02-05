import React, {lazy} from 'react';
import {Route, Switch, useLocation} from 'react-router-dom';
import MinimalLayout from './../layout/MinimalLayout';



const AuthPassword = lazy(() => import('../views/pages/authentication/forgetpassword'));


const AuthenticationRoutes = () => {
    const location = useLocation();

    return (
        <Route
            path={[
                
                '/forget-password',
                
            ]}
        >
            <MinimalLayout>
                <Switch location={location} key={location.pathname}>
                    <Route path="/forget-password" component={AuthPassword} />
                </Switch>
            </MinimalLayout>
        </Route>
    );
};

export default AuthenticationRoutes;
