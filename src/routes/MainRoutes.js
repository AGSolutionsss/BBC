import React, {lazy} from 'react';
import {Route, Switch, useLocation} from 'react-router-dom';
import MainLayout from './../layout/MainLayout';

const DashboardDefault = lazy(() => import('../views/dashboard/Default'));
const UserEnquiry = lazy(() => import('../views/userEnquiry/UserList'));
const UserProfile = lazy(() => import('../views/userProfile'));
const ChangePassword = lazy(() => import('../views/changePassword'));
const UserAbout = lazy(() => import('../views/userAbout'));
const UserSlider = lazy(() => import('../views/userSlider'));
const UserActiveList = lazy(() => import('../views/userActive/UserActiveList'));
const UserInactiveList = lazy(() => import('../views/userInactive/UserInactiveList'));
const UserNewProfile = lazy(() => import('../views/userNewProfile/UserNewProfile'));
const UpdateNewProfile = lazy(() => import('../views/userNewProfile/UpdateNewProfile'));

const MainRoutes = () => {
    const location = useLocation();

    return (
        <Route
            path={[
                '/dashboard',
                '/users-profile',
                '/users-enquiry',
                '/change-password',
                '/users-about',
                '/users-slider',
                '/users-active',
                '/users-inactive',
                '/users-new',
                '/view',
            ]}
        >
            <MainLayout showBreadcrumb={true}>
                <Switch location={location} key={location.pathname}>
                    <Route path="/dashboard" component={DashboardDefault} />
                    <Route path='/users-profile' component={UserProfile}/>
                    <Route path="/users-enquiry" component={UserEnquiry}/>
                    <Route path='/change-password' component={ChangePassword}/>
                    <Route path='/users-about' component={UserAbout}/>
                    <Route path='/users-slider' component={UserSlider}/>
                    <Route path='/users-active' component={UserActiveList}/>
                    <Route path='/users-inactive' component={UserInactiveList}/>
                    <Route path='/users-new' component={UserNewProfile}/>
                    <Route path='/view' component={UpdateNewProfile}/>
                </Switch>
            </MainLayout>
        </Route>
    );
};

export default MainRoutes;
