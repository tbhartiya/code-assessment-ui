import * as React from 'react';
import NavBar from './navBar'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import PeopleIcon from '@mui/icons-material/People';
import Applicants from './applicants'
import Tests from './tests'
import { Menus } from './constant'
import { Routes, Route } from "react-router-dom";

const menus = [{
    icon: PeopleIcon,
    name: Menus.applicants.title,
    path: '/'
}, {
    icon: BorderColorIcon,
    name: Menus.tests.title,
    path: '/tests'
}];

export default function AdminContainer({ user, onLogout }) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (selectedMenu) => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logOut = () => {
        handleCloseUserMenu();
        onLogout()
    }

    const userName = JSON.parse(localStorage.getItem('user'))?.name;

    const settings = [
        { name: userName, onClick: handleCloseUserMenu },
        { name: 'Logout', onClick: logOut }];

    return (
        <>
            <Routes>
                <Route path="/" element={
                    <NavBar menus={menus}
                        settings={settings}
                        anchorElNav={anchorElNav}
                        anchorElUser={anchorElUser}
                        handleOpenNavMenu={handleOpenNavMenu}
                        handleOpenUserMenu={handleOpenUserMenu}
                        handleCloseNavMenu={handleCloseNavMenu}
                        handleCloseUserMenu={handleCloseUserMenu}
                        user={user}
                    />}>
                    <Route index element={<Applicants />} />
                    <Route path="tests" element={<Tests />} />
                    {/* <Route path="dashboard" element={<Dashboard />} /> */}
                </Route>
            </Routes>

        </>
    );
}
