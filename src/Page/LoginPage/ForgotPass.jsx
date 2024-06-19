import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPass.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendOtp, verifyOtp, resetPassword } from '../../Services/forgotpass';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
            await sendOtp(email);
            toast.success('OTP đã được gửi đến email của bạn!');
            setStep(2);
        } catch (error) {
            toast.error('Gửi OTP thất bại. Vui lòng thử lại!');
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            await verifyOtp(email, otp);
            toast.success('Xác minh OTP thành công!');
            setStep(3);
        } catch (error) {
            toast.error('Xác minh OTP thất bại. Vui lòng thử lại!');
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error('Mật khẩu xác nhận không khớp!');
            return;
        }
        try {
            await resetPassword(email, newPassword, confirmPassword);
            toast.success('Đặt lại mật khẩu thành công!');
            navigate('/login');
        } catch (error) {
            toast.error('Đặt lại mật khẩu thất bại. Vui lòng thử lại!');
        }
    };

    return (
        <div className="forgot-password-wrapper">
            <h1>Quên mật khẩu</h1>
            {step === 1 && (
                <form onSubmit={handleSendOtp}>
                    <div className="input-box">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn">Gửi OTP</button>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleVerifyOtp}>
                    <div className="input-box">
                        <input
                            type="text"
                            name="otp"
                            placeholder="OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn">Xác minh OTP</button>
                </form>
            )}

            {step === 3 && (
                <form onSubmit={handleResetPassword}>
                    <div className="input-box">
                        <input
                            type="text"
                            name="newPassword"
                            placeholder="Mật khẩu mới"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            name="confirmPassword"
                            placeholder="Xác nhận mật khẩu"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    {newPassword !== confirmPassword && (
                        <p className="error">Mật khẩu xác nhận không khớp!</p>
                    )}
                    <button type="submit" className="btn">Đặt lại mật khẩu</button>
                </form>
            )}
            <ToastContainer 
                position="top-right" 
                autoClose={5000} 
                hideProgressBar={false} 
                newestOnTop={false} 
                closeOnClick 
                rtl={false} 
                pauseOnFocusLoss 
                draggable 
                pauseOnHover 
            />
        </div>
    );
};

export default ForgotPassword;
