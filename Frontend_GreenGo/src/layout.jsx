import { useState, useEffect } from "react";
import { Link, useNavigate, Outlet } from 'react-router-dom';
import './home.css'
import profileLogo from './assets/profile.jpg';
import { Profile } from "./Menus.jsx";

function Layout() {


    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [userLogedIn, setUserLogedIn] = useState(false);
    const [adminLogedIn, setAdminLogedIn] = useState(false);
    const [isLogedIn, setIsLogedIn] = useState(false);
    const [isProfile, setIsProfile] = useState(false);

    useEffect(
        () => {
            const logedIn = localStorage.getItem("isLogedIn") === "true";
            setIsLogedIn(logedIn);
        },
        []
    )

    const updateLogins = () => {
        if (isLogedIn) {

            const isUser = localStorage.getItem("isUser") === "true";

            if (isUser) {
                setUserLogedIn(true);
                setAdminLogedIn(false);
            }
            else {
                setAdminLogedIn(true);
                setUserLogedIn(false);
            }

        }
        else {
            setUserLogedIn(false);
            setAdminLogedIn(false);
        }
        setShowMenu(!showMenu);
    }
    const removeCredentials = () => {
        localStorage.clear();
        setShowMenu(false);
        setUserLogedIn(false);
        setAdminLogedIn(false);
        setIsLogedIn(false);
        navigate("/");
    }

    const reback = () => {
        setShowMenu(false);
        setIsProfile(false);

    }

    const AdminMenu = () => {
        return (
            <div className="menu">
                <Link className="menu_links" to="/requests" onClick={() => reback()}>Requests</Link>
                {/* <button className="menu_links"
                            onClick={() => {
                                reback();

                            }}
                        >User List</button>
                        <button className="menu_links"
                            onClick={
                                () => {
                                    reback();
                                    setIsAboutUs(true);
                                }
                            }
                        >About Us</button>
                        <button className="menu_links">Contact Us</button> */}
                <button type="button" className="menu_links" onClick={removeCredentials}>Log Out</button>

            </div>
        )
    }

    const UserMenu = () => {
        return (
            <div className="menu">
                <Link className="menu_links" to="/newrequest" onClick={() => reback()}>New request</Link>
                <Link className="menu_links" to="/requesthistory" onClick={() => reback()}>Request History</Link>

                {/* <button className="menu_links"
                            onClick={
                                () => {
                                    reback();
                                    setIsAboutUs(true);
                                }
                            }
                        >About Us</button>
                        <button className="menu_links"
                            onClick={() => {
                                reback();

                            }}
                        >Contact Us</button> */}
                <button type="button" className="menu_links" onClick={removeCredentials}>Log Out</button>

            </div>
        )
    }


    function GetMenu() {
        if (showMenu) {
            if (userLogedIn) {
                return (<UserMenu />);
            }
            if (adminLogedIn) {
                return (<AdminMenu />); 
            }
            return (
                <div className="menu">
                    <Link className="menu_links">About Us</Link>
                    <Link className="menu_links">Contact Us</Link>
                </div>
            )
        }
        return <></>;
    }
    return (
        
        <>


            <div className="userPage">
                <div className="header">
                    <div className="inHeader">
                        <Link className="user_link" to="/">Home</Link>
                        <div className="header_right_links">
                            <div>
                                {
                                    isProfile && <Profile />
                                }
                            </div>
                            {
                                isLogedIn ?
                                    <img src={profileLogo} id="userProfile" onClick={() => setIsProfile(!isProfile)} />
                                    : <Link to="/login" className="menu_links user_link">SignIn / SignUp</Link>
                                    
                            }
                            <div id="user_options" className="user_link" onClick={updateLogins}>
                                <div className="user_options_line"></div>
                                <div className="user_options_line"></div>
                                <div className="user_options_line"></div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="userBody">


                    <Outlet />
                    {GetMenu()}
                </div>
            </div>

        </>
    )
}
export default Layout;

