import * as React from 'react';
import NavBar from '../common/navBar'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import PeopleIcon from '@mui/icons-material/People';
import Box from '@mui/material/Box';
import Applicants from './applicants'
import Tests from './tests'
import { Menus } from './constant'

const menus = [{
    icon: PeopleIcon,
    name: Menus.applicants.title,
}, {
    icon: BorderColorIcon,
    name: Menus.tests.title,
}];

export default function AdminContainer({ user, onLogout }) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [selectedMenu, setSelectedMenu] = React.useState({
        icon: PeopleIcon,
        name: Menus.applicants.title,
    });

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (selectedMenu) => {
        setSelectedMenu(selectedMenu)
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logOut = () => {
        handleCloseUserMenu();
        onLogout()
    }

    const settings = [
        { name: 'Profile', onClick: handleCloseUserMenu },
        { name: 'Logout', onClick: logOut }];

    const getSelectedComponents = (name) => {
        switch (name) {
            case 'Tests':
                return <Tests />
            default:
                return <Applicants />
        }
    }

    return (
        <>
            <NavBar menus={menus}
                settings={settings}
                anchorElNav={anchorElNav}
                anchorElUser={anchorElUser}
                handleOpenNavMenu={handleOpenNavMenu}
                handleOpenUserMenu={handleOpenUserMenu}
                handleCloseNavMenu={handleCloseNavMenu}
                handleCloseUserMenu={handleCloseUserMenu}
                user={user}
            />
            <Box mt={2}>
                {
                    getSelectedComponents(selectedMenu.name)
                }
            </Box>
        </>
    );
}
