import React, { useState } from 'react';
import './Login.css';
import { FaUser, FaLock, FaEnvelope, FaPhone } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullname, setFullname] = useState('');
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleActive = () => {
    setIsLoginActive(!isLoginActive);
    setErrorMessage('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:7285/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: username,
          password: password
        }),
        mode: 'cors' 
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        console.error('Login failed:', errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:7285/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullname: fullname,
          email: email,
          phoneNumber: phoneNumber
        }),
        mode: 'cors'
      });

      if (response.ok) {
        setIsLoginActive(true);
        setErrorMessage('');
        const data = await response.json();
        console.log(data);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const wrapperClass = isLoginActive ? 'wrapper' : 'wrapper active';

  return (
    <div className={wrapperClass}>
      <div className='form-box login'>
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className='input-box'>
            <FaUser className='icon' /> 
            <input 
              type='text' 
              placeholder='Username' 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />    
          </div>
          <div className='input-box'>
            <FaLock className='icon' />
            <input 
              type='password' 
              placeholder='Password' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <div className='remember-forgot'>
            <label><input type='checkbox' />Remember me</label>
            <a href='#'>Forgot Password?</a>
          </div>
          <button type='submit'>Login</button>
          <div className='register-link'>
            <p>Don't have an account? <a href='#' onClick={toggleActive}>Register</a></p>
            {errorMessage && <p color = "red"className="error-message">{errorMessage}</p>}
            
          </div>
        </form>
      </div>

      <div className='form-box register'>
        <form onSubmit={handleRegister}>
          <h1>Register</h1>
          <div className='input-box'>
            <FaUser className='icon' />
            <input 
              type='text' 
              placeholder='Full Name' 
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required 
            />    
          </div>
          <div className='input-box'>
            <FaEnvelope className='icon' />
            <input 
              type='email' 
              placeholder='Email' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />    
          </div>
          <div className='input-box'>
            <FaPhone className='icon' />
            <input 
              type='text' 
              placeholder='Phone Number'  
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required 
            />
          </div>
          <button type='submit'>Register</button>
          <div className='register-link'>
            <p>Already have an account? <a href='#' onClick={toggleActive}>Login</a></p>
            {errorMessage && <p color='red' className="error-message">{errorMessage}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
