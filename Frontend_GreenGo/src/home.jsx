import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './home.css'
import { Profile, NewRequest, Requests } from "./Menus";
import profileLogo from './assets/profile.jpg'
function Home() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [userLogedIn, setUserLogedIn] = useState(false);
    const [adminLogedIn, setAdminLogedIn] = useState(false);
    const [isLogedIn, setIsLogedIn] = useState(false);
    const [isProfile, setIsProfile] = useState(false);
    const [isNewRequest, setIsNewRequest] = useState(false);
    const [isRequest, setIsRequest] = useState(false);
    useEffect(
        () => {
            const logedIn = localStorage.getItem("isLogedIn") === "true";
            setIsLogedIn(logedIn);
        },
        []
    )

    const updateLogins = () => {
        const logedIn = localStorage.getItem("isLogedIn") === "true";
        if (logedIn) {

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
        setIsProfile(false);
        setIsNewRequest(false);
    }

    const reback = () => {
        setIsNewRequest(false);
    }
    function GetMenu() {
        if (showMenu) {
            if (userLogedIn) {
                return (
                    <div className="menu">
                        <button className="menu_links" onClick={() => {
                            reback();
                            setIsNewRequest(true);
                        }}>New request</button>
                        <button className="menu_links">Request History</button>
                        <button className="menu_links">About Us</button>
                        <button className="menu_links">Contact Us</button>
                        <button type="button" className="menu_links" onClick={removeCredentials}>Log Out</button>

                    </div>
                )
            }
            if (adminLogedIn) {
                return (
                    <div className="menu">
                        <button className="menu_links" onClick={() => {
                            reback();
                            setIsRequest(!isRequest);
                        }}>Requests</button>
                        <button className="menu_links" >User List</button>
                        <button className="menu_links">About Us</button>
                        <button className="menu_links">Contact Us</button>
                        <button type="button" className="menu_links" onClick={removeCredentials}>Log Out</button>

                    </div>
                )
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
        <div className="userPage">
            <div className="header">
                <Link to='/home' className="user_link">
                    Home
                </Link>
                <div className="header_right_links">
                    <div className="profile_container">
                        {
                            isProfile && <Profile />
                        }
                    </div>
                    {
                        isLogedIn ?
                            <img src={profileLogo} id="userProfile" onClick={() => setIsProfile(!isProfile)} />
                            : <Link className="menu_links user_link" to='/login'>SignIn / SignUp</Link>
                    }
                    <div id="user_options" className="user_link" onClick={updateLogins}>
                        <div className="user_options_line"></div>
                        <div className="user_options_line"></div>
                        <div className="user_options_line"></div>
                    </div>
                </div>

            </div>
            <div className="userBody">
                <div>
                    {
                        isNewRequest && <NewRequest />
                    }
                    {
                        isRequest &&
                        <Requests />
                    }
                </div>
                {GetMenu()}
            </div>
        </div>
    )
}
export default Home;