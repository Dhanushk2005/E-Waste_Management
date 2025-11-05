import React, { useState } from "react";
import './register.css';
import './loading.css';
import { Link } from 'react-router-dom';
import icon from "./icon.jpeg"

function Create_register() {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passRepeat, setPassRepeat] = useState("");


    const [message, setMessage] = useState("");
    const [otp, setOtp] = useState("");
    const [otpMessage, setOtpMessage] = useState("");
    const [isVerified, setIsVerified] = useState(false);

    const [loading, setLoading] = useState(false);


    const post_register = async (event) => {
        event.preventDefault();
        console.log(isVerified);
        if (!isVerified) {
            setMessage("Verify the Email");
            return;
        }
        if (password !== passRepeat) {
            setMessage("Password Doesn't match");
            setPassword("");
            setPassRepeat("");
            return;
        }
        try {
            setLoading(true);
            const response = await fetch("http://localhost:789/user/register", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName: fullname,
                    email: email,
                    password: password,
                    user_type: "user"
                })
            })
            const message = await response.text();

            if (message == "true") {
                setMessage("Registered Successfully!! Login to Continue");
                setOtp("");
                setEmail("");
                setFullname("");
                setPassword("");
                setPassRepeat("");
                setIsVerified(false);
            }

            else {
                setMessage("Email is already registered!!  Try Another");
                setEmail("");
            }
        }
        catch (error) {
            alert("Error!!!");
        }
        finally {
            setLoading(false);
        }
    }

    const giveOtp = async (event) => {
        event.preventDefault();
        setOtpMessage("");
        try {
            setLoading(true);
            const otpApi = await fetch("http://localhost:789/Email/sendOtp", {
                method: "post",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ email }).toString()
            })
            const message = await otpApi.text();
            setOtpMessage(message);

        }
        catch (Error) {
            alert("Please try Again Later!!");
        }
        finally {
            setLoading(false);
        }
    }
    const otpVerify = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const VerifyApi = await fetch("http://localhost:789/Email/validateOtp", {
                method: "post",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ email, otp }).toString()
            })
            const message = await VerifyApi.text();
            if (message == '1') {
                setIsVerified(true);
                setOtpMessage("Verified Sucessfully");
            }
            else if (message == '2') {
                setOtpMessage('OTP was expired!');
            }
            else if (message == '2') {
                setOtpMessage('OTP doesn\'t match');
            }
            else {
                setOtpMessage('Click Send OTP button to send OTP');
            }
        }
        catch (error) {
            alert("Error!!");
        }
        finally {
            setLoading(false);
        }
    }
    return (

        <div className="full_page_container">
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

            <div className="Register_container">

                <h1>Register</h1>
                <h1 className="heading">
                    Welcome To <spam className="highlight">GreenGo</spam>
                </h1>
                <img src={icon} className="logo"></img>
                <form onSubmit={post_register}>

                    <div className="input_container">
                        <label htmlFor="name" className="register_label"> Full Name : </label>
                        <input type="text" placeholder="Full_Name" id="name" value={fullname} onChange={(e) => setFullname(e.target.value)} required></input>
                        <label htmlFor="email" className="register_label"> Email : </label>

                        <div>
                            <input type="text" placeholder="Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>

                            <button type="button" onClick={giveOtp} className="otp_button">Send OTP</button>

                        </div>
                        <div className="otp_container">

                            <p className={otpMessage === "Verified Sucessfully" || otpMessage === "Opt Sent Sucessfully"?"success_message":"error_message"}>{otpMessage}</p>
                            <input type="number" placeholder="OTP" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} required></input>
                            <button type="button" onClick={otpVerify} className="otp_button">Verify</button>
                        </div>

                        <label htmlFor="password" className="register_label"> Password : </label>

                        <input type="password" placeholder="Enter Your Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>

                        <label htmlFor="passRepeat" className="register_label">Confirm Password : </label>

                        <input type="password" placeholder="Enter Your Password again" id="passRepeat" value={passRepeat} onChange={(e) => setPassRepeat(e.target.value)} required></input>

                        <button type="submit" id="submit_button">Submit</button>

                        <p className={message === "Registered Successfully!! Login to Continue"?"success_message":"error_message"}>{message}</p>


                        <Link to="/login" className="Register_page_links">Already a User!!</Link>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default Create_register;