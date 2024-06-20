import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { loginUser } from '../../Services/loginApi';
import { registerUser } from '../../Services/registerApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [isLoginActive, setIsLoginActive] = useState(true);
    const [formData, setFormData] = useState({ email: '', password: '', fullname: '', phoneNumber: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const toggleActive = () => {
        setIsLoginActive(!isLoginActive);
        setFormData({ email: '', password: '', fullname: '', phoneNumber: '' });
        setError('');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message
        try {
            const result = await loginUser(formData.email, formData.password);
            const user = result;

            if (user.role === 'Admin') {
                navigate('/'); // Redirect to dashboard for admin
            } else if (user.role === 'User') {
                navigate('/'); // Redirect to homepage for user
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message
        try {
            const result = await registerUser(formData.fullname, formData.email, formData.phoneNumber);
            toast.success("Đăng kí thành công!");
            toggleActive(); // Switch back to login form after successful registration
        } catch (error) {
            setError(error.message);
            toast.error("Đăng kí thất bại!");
        }
    };

    const wrapperClass = isLoginActive ? 'wrapper' : 'wrapper active';

    return (
        <div className='login-wrapper'>
            <div className={wrapperClass}>
                <div className='form-box login'>
                    <form onSubmit={handleLogin}>
                        <h1>Login</h1>
                        <div className='input-box'>
                            <input 
                                type='text' 
                                name='email' 
                                placeholder='Email' 
                                value={formData.email} 
                                onChange={handleChange} 
                                required 
                            />
                            <FaUser className='icon' />
                        </div>
                        <div className='input-box'>
                            <input 
                                type='password' 
                                name='password' 
                                placeholder='Password' 
                                value={formData.password} 
                                onChange={handleChange} 
                                required 
                            />
                            <FaLock className='icon' />
                        </div>
                        <div className='remember-forgot'>
                            <label><input type='checkbox' />Remember me</label>
                            <Link to='/forgotpassword'>Forgot Password?</Link>
                        </div>
                        {error && <p className='error'>{error}</p>}
                        <button type='submit'>Login</button>
                        <div className='register-link'>
                            <p>Don't have an account? <a href='#' onClick={toggleActive}>Register</a></p>
                        </div>
                    </form>
                </div>

                <div className='form-box register'>
                    <form onSubmit={handleRegister}>
                        <h1>Register</h1>
                        <div className='input-box'>
                            <input 
                                type='text' 
                                name='fullname' 
                                placeholder='Fullname' 
                                value={formData.fullname} 
                                onChange={handleChange} 
                                required 
                            />
                            <FaUser className='icon' />
                        </div>
                        <div className='input-box'>
                            <input 
                                type='email' 
                                name='email' 
                                placeholder='Email' 
                                value={formData.email} 
                                onChange={handleChange} 
                                required 
                            />
                            <FaEnvelope className='icon' />
                        </div>
                        <div className='input-box'>
                            <input 
                                type='text' 
                                name='phoneNumber'  
                                placeholder='Phone Number'  
                                value={formData.phoneNumber} 
                                onChange={handleChange} 
                                required 
                            />
                            <FaLock className='icon' />
                        </div>
                        {error && <p className='error'>{error}</p>}
                        <button type='submit'>Register</button>
                        <div className='register-link'>
                            <p>Already have an account? <a href='#' onClick={toggleActive}>Login</a></p>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default Login;
