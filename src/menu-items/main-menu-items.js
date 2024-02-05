import React from 'react';
import {FormattedMessage} from 'react-intl';

import {
    IconAtom,
    IconBasket,
    IconBellRinging,
    IconBorderAll,
    IconBorderRadius,
    IconBoxMultiple,
    IconBrandChrome,
    IconBrandGravatar,
    IconBrush,
    IconBug,
    IconCalendar,
    IconChartArcs,
    IconChartCandle,
    IconChartInfographic,
    IconCircle,
    IconCircleOff,
    IconClipboardList,
    IconDashboard,
    IconDeviceAnalytics,
    IconFiles,
    IconForms,
    IconHelp,
    IconId,
    IconKey,
    IconLayoutList,
    IconLoader,
    IconLockAccess,
    IconMail,
    IconMenu,
    IconMessages,
    IconNfc,
    IconPalette,
    IconPencil,
    IconPhoneCall,
    IconPictureInPicture,
    IconReceipt2,
    IconRun,
    IconShadow,
    IconShape,
    IconShieldLock,
    IconSitemap,
    IconTools,
    IconTypography,
    IconUser,
    IconUserCheck
} from '@tabler/icons';

const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,

    IconChartArcs: IconChartArcs,
    IconClipboardList: IconClipboardList,
    IconChartInfographic: IconChartInfographic,

    IconForms: IconForms,
    IconReceipt2: IconReceipt2,
    IconPencil: IconPencil,
    IconPalette: IconPalette,
    IconShadow: IconShadow,
    IconPhoneCall: IconPhoneCall,
    IconBrandChrome: IconBrandChrome,
    IconFiles: IconFiles,
    IconAtom: IconAtom,
    IconTools: IconTools,
    IconBrush: IconBrush,
    IconLockAccess: IconLockAccess,
    IconShieldLock: IconShieldLock,
    IconKey: IconKey,
    IconTypography: IconTypography,
    IconMenu: IconMenu,
    IconBoxMultiple: IconBoxMultiple,
    IconCircleOff: IconCircleOff,
    IconCircle: IconCircle,
    IconBorderRadius: IconBorderRadius,
    IconBrandGravatar: IconBrandGravatar,
    IconShape: IconShape,
    IconUserCheck: IconUserCheck,
    IconId: IconId,
    IconLayoutList: IconLayoutList,
    IconBug: IconBug,
    IconLoader: IconLoader,
    IconRun: IconRun,
    IconUser: IconUser,
    IconHelp: IconHelp,
    IconSitemap: IconSitemap,
    IconPictureInPicture: IconPictureInPicture,
    IconMail: IconMail,
    IconMessages: IconMessages,
    IconNfc: IconNfc,
    IconCalendar: IconCalendar,
    IconBellRinging: IconBellRinging,
    IconBorderAll: IconBorderAll,
    IconChartCandle: IconChartCandle,
    IconBasket: IconBasket
};

const menuItems1 = {
    items: [
        {
            id: 'dashboard',
            title: <FormattedMessage id="dashboard" />,
            type: 'group',
            children: [
                {
                    id: 'dash-default',
                    title: <FormattedMessage id="Dashboard" />,
                    type: 'item',
                    url: '/dashboard',
                    icon: icons['IconDashboard'],
                    breadcrumbs: false
                },
                {
                    id: 'users-profile',
                    title: <FormattedMessage id="Profile" />,
                    type: 'item',
                    url: '/users-profile',
                    icon: icons['IconUserCheck'],
                    
                },
            ]
        },
{
    id: 'utilities',
    title: <FormattedMessage id="Website" />,
    type: 'group',
    children: [
        {
            id: 'sample-page',
            title: <FormattedMessage id="About Us" />,
            type: 'item',
            url: '/users-about',
            icon: icons['IconBrandChrome']
        },
        {
            id: 'icons1',
            title: <FormattedMessage id="Portfolio" />,
            type: 'item',
            url: '/users-slider',
            icon: icons['IconPencil'],
            
        },
        {
            id: 'icons',
            title: <FormattedMessage id="Enquiry" />,
            type: 'item',
            url: '/users-enquiry',
            icon: icons['IconCalendar'],
            
        },
        
    ]
},
{
    id: 'utilities',
    title: <FormattedMessage id="Users" />,
    type: 'group',
    children:[
        {
            id: 'icons111',
            title: <FormattedMessage id="New User" />,
            type: 'item',
            url: '/users-new',
            icon: icons['IconPencil'],
            
        },
        {
            id: 'sample-page1',
            title: <FormattedMessage id="Active User" />,
            type: 'item',
            url: '/users-active',
            icon: icons['IconBrandChrome']
        },
        {
            id: 'icons11',
            title: <FormattedMessage id="Inactive User" />,
            type: 'item',
            url: '/users-inactive',
            icon: icons['IconPencil'],
            
        },
    ]
},
   
     
    ]
};

const menuItems2 = {
    items: [
        {
            id: 'dashboard',
            title: <FormattedMessage id="dashboard" />,
            type: 'group',
            children: [
                {
                    id: 'dash-default',
                    title: <FormattedMessage id="Dashboard" />,
                    type: 'item',
                    url: '/dashboard',
                    icon: icons['IconDashboard'],
                    breadcrumbs: false
                },
                {
                    id: 'users-profile',
                    title: <FormattedMessage id="Profile" />,
                    type: 'item',
                    url: '/users-profile',
                    icon: icons['IconUserCheck'],
                    
                },
            ]
        },
{
    id: 'utilities',
    title: <FormattedMessage id="Website" />,
    type: 'group',
    children: [
        {
            id: 'sample-page',
            title: <FormattedMessage id="About Us" />,
            type: 'item',
            url: '/users-about',
            icon: icons['IconBrandChrome']
        },
        {
            id: 'icons1',
            title: <FormattedMessage id="Portfolio" />,
            type: 'item',
            url: '/users-slider',
            icon: icons['IconPencil'],
            
        },
        {
            id: 'icons',
            title: <FormattedMessage id="Enquiry" />,
            type: 'item',
            url: '/users-enquiry',
            icon: icons['IconCalendar'],
            
        },
        
    ]
},
  
    ]
};

const menuItems = localStorage.getItem('admin_type') === 'admin' ? menuItems1 : menuItems2;

export default menuItems;
