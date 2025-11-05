import React, { use, useState } from "react";
import "./login.css"
import Register from "./register.jsx"
import { Link, useNavigate } from 'react-router-dom';
import './loading.css'
import icon from "./icon.jpeg"
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const Login_Api = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const responce = await fetch("http://localhost:789/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ email, password }).toString()
            });
            const text = await responce.text();
            if (responce.ok) {
                setMessage("Login Successful");
                localStorage.setItem("isUser", text);
                localStorage.setItem("isLogedIn", "true");
                const getUser = await fetch("http://localhost:789/user/getUser", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: new URLSearchParams({ email }).toString()
                })
                const user = await getUser.json();
                console.log(user);
                localStorage.setItem("userBody", JSON.stringify(user))
                navigate("/home");
            }
            else {
                setMessage(`Error!! ${text}`)
            }


        }

        finally {
            setLoading(false);
        }
    }
    return (
        <div className="login_page">
            {
                loading ? (
                    <div className="loading_page">
                        <div className="loader">

                        </div>
                    </div>
                ) : (
                    <></>
                )
            }
            <Link to="/home" className="links_page">
                Home
            </Link>
            <div id="intro_container">
                <h1 id="intro">Welcome To <span className="highlight_text">GreenGo</span></h1>
            </div>

            <div className="login_container">
                <h1 className="heading">
                    Login
                </h1>
                <center>
                    <img src={icon} className="logo"></img>
                </center>
                <h3 className="heading">Sign in with Email <br />
                    Login to access Your Dashboard</h3>
                <form onSubmit={Login_Api}>
                    <div>
                        <div>
                            <label className="login_label" htmlFor="email">
                                Email
                            </label>
                        </div>
                        <div className="input_container">
                            <input
                                type="text"
                                id="email"
                                className="login_inputs"
                                placeholder="Email eg..abc1@example.com"
                                required
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label className="login_label" htmlFor="password">
                                Password
                            </label>
                        </div>
                        <div className="input_container">
                            <input
                                type="password"
                                id="password"
                                className="login_inputs"
                                placeholder="Password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="button_container">
                        <button
                            type="submit"
                            id="login_submit_button"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div>
                    <Link className="login_page_links" to="/register">New User!!</Link>
                </div>
                <p className={message === "Login Successful" ? "success_message" : "error_message"}>{message}</p>

            </div>
        </div>
    )
}
export default Login;