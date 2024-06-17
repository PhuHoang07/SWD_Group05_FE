import React, { useState } from 'react'
import '../Page/Login.css'
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";


const Login = () => {

    const [action, setAction] = useState('');

    const [isLoginActive, setIsLoginActive] = useState(true);

    const toggleActive = () => {
        setIsLoginActive(!isLoginActive);
    };
    const wrapperClass = isLoginActive ? 'wrapper' : 'wrapper active';

    return (
        <div className='login-wrapper'>
            <div className={wrapperClass}>
                <div className='form-box login'>
                    <form action=''>
                        <h1>Login</h1>
                        <div className='input-box'>
                            <input type='text' placeholder='Username' required />
                            <FaUser className='icon' />
                        </div>
                        <div className='input-box'>
                            <input type='password' placeholder='Password' required />
                            <FaLock className='icon' />
                        </div>
                        <div className='remember-forgot'>
                            <label><input type='checkbox' />Remember me</label>
                            <a href='#'>Forgot Password?</a>
                        </div>
                        <button type='submit' >Login</button>
                        <div className='register-link'>
                            <p>Don't have an account? <a href='#' onClick={toggleActive}>Register</a></p>
                        </div>
                    </form>
                </div>

                <div className='form-box register'>
                    <form action=''>
                        <h1>Register</h1>
                        <div className='input-box'>
                            <input type='text' placeholder='Username' required />
                            <FaUser className='icon' />
                        </div>
                        <div className='input-box'>
                            <input type='email' placeholder='Email' required />
                            <FaEnvelope className='icon' />
                        </div>
                        <div className='input-box'>
                            <input type='password' placeholder='Password' required />
                            <FaLock className='icon' />
                        </div>
                        <button type='submit' >Register</button>
                        <div className='register-link'>
                            <p>Already have an account? <a href='#' onClick={toggleActive}>Login</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Login