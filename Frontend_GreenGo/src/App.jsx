import React, { useState } from 'react';
import './App.css';
import LoginPage from "./login.jsx";
import RegisterPage from "./register.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import myIcon from "./icon.jpeg";
import Home from './home.jsx';
import Admin from './AdminPage/Admin.jsx';

function App() {

    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />}> </Route>
                    <Route path='/login' element={<LoginPage />}> </Route>
                    <Route path='/register' element={<RegisterPage />}> </Route>
                    <Route path='/home' element={<Home />}></Route>
                    <Route path='/admin' element={<Admin />}></Route>
                </Routes>
            </Router>
        </div>
    )
}

export default App;

