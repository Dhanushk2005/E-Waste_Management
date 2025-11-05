import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './user.css'
import UserDashboard from "./userDashboard";


function User() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [userLogedIn, setUserLogedIn] = useState(false);
    const [adminLogedIn, setAdminLogedIn] = useState(false);

    const [user, setUser] = useState({
        name: "",
        email: "",
        requests: [],
        usertype: ""
    })

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
            setUser(JSON.parse(localStorage.getItem("user")));
        }
        else{
            setUserLogedIn(false);
            setAdminLogedIn(false);
        }
        setShowMenu(!showMenu);
    }
    const removeCredentials = () => {
        localStorage.clear();
        setShowMenu(false);
    }
    function GetMenu() {
        if (showMenu) {
            if (userLogedIn) {
                return (
                    <div className="menu">
                        <Link className="menu_links">profile</Link>
                        <Link className="menu_links">New request</Link>
                        <Link className="menu_links">Request History</Link>
                        <Link className="menu_links">About Us</Link>
                        <Link className="menu_links">Contact Us</Link>
                        <button type="button" className="menu_links" onClick={removeCredentials}>Log Out</button>

                    </div>
                )
            }
            if (adminLogedIn) {
                return (
                    <div className="menu">
                        <Link className="menu_links">profile</Link>
                        <Link className="menu_links">Requests</Link>
                        <Link className="menu_links" >Users List</Link>
                        <Link className="menu_links">About Us</Link>
                        <Link className="menu_links">Contact Us</Link>
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
                    <Link className="menu_links user_link" to='/login'>SignIn / SignUp</Link>
                    <Link></Link>
                    <div id="user_options" className="user_link" onClick={updateLogins}>
                        <div className="user_options_line"></div>
                        <div className="user_options_line"></div>
                        <div className="user_options_line"></div>
                    </div>
                </div>
            </div>
            <div className="userBody">
                <div>

                </div>
                {GetMenu()}
            </div>
        </div>
    )
}
export default User;